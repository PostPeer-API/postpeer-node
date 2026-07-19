import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import PostPeer, { APIConnectionTimeoutError, NotFoundError, PostPeerError } from '../src/index';

const jsonResponse = (body: unknown, init: ResponseInit = {}): Response =>
  new Response(JSON.stringify(body), {
    headers: { 'content-type': 'application/json', ...init.headers },
    ...init,
  });

const originalApiKey = process.env['POSTPEER_API_KEY'];

beforeEach(() => {
  delete process.env['POSTPEER_API_KEY'];
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
  if (originalApiKey === undefined) {
    delete process.env['POSTPEER_API_KEY'];
  } else {
    process.env['POSTPEER_API_KEY'] = originalApiKey;
  }
});

describe('PostPeer', () => {
  it('requires an API key', () => {
    expect(() => new PostPeer()).toThrow(PostPeerError);
  });

  it('reads the API key from the environment', async () => {
    process.env['POSTPEER_API_KEY'] = 'env-key';
    const requests: Request[] = [];
    const fetch = vi.fn(async (request: RequestInfo | URL) => {
      requests.push(request as Request);
      return jsonResponse({ ok: true });
    });

    const postPeer = new PostPeer({ fetch, maxRetries: 0 });
    await postPeer.health.verifyAccessKey();

    expect(requests[0]?.headers.get('x-access-key')).toBe('env-key');
  });

  it('keeps multiple clients isolated', async () => {
    const headers: string[] = [];
    const fetch = vi.fn(async (request: RequestInfo | URL) => {
      headers.push((request as Request).headers.get('x-access-key') ?? '');
      return jsonResponse({ ok: true });
    });
    const first = new PostPeer({ apiKey: 'first-key', fetch, maxRetries: 0 });
    const second = new PostPeer({ apiKey: 'second-key', fetch, maxRetries: 0 });

    await first.health.verifyAccessKey();
    await second.health.verifyAccessKey();

    expect(headers).toEqual(['first-key', 'second-key']);
  });

  it('exposes the generated resource structure', () => {
    const postPeer = new PostPeer({
      apiKey: 'test-key',
      fetch: vi.fn(),
      maxRetries: 0,
    });

    expect(postPeer.posts.create).toBeTypeOf('function');
    expect(postPeer.posts.scheduled.reschedule).toBeTypeOf('function');
    expect(postPeer.connect.integrations.list).toBeTypeOf('function');
    expect(postPeer.profiles.create).toBeTypeOf('function');
    expect(postPeer.notifications.test).toBeTypeOf('function');
    expect(postPeer.ai.generateImage).toBeTypeOf('function');
  });

  it('throws typed API errors', async () => {
    const fetch = vi.fn(async () =>
      jsonResponse(
        { code: 'missing_profile', message: 'Profile not found' },
        { headers: { 'x-request-id': 'req_123' }, status: 404 },
      ),
    );
    const postPeer = new PostPeer({ apiKey: 'test-key', fetch, maxRetries: 0 });

    await expect(postPeer.profiles.get({ path: { id: 'missing' } })).rejects.toMatchObject({
      code: 'missing_profile',
      message: 'Profile not found',
      requestId: 'req_123',
      status: 404,
    });
    await expect(postPeer.profiles.get({ path: { id: 'missing' } })).rejects.toBeInstanceOf(NotFoundError);
  });

  it('retries transient responses', async () => {
    vi.useFakeTimers();
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(jsonResponse({ error: 'temporary' }, { status: 500 }))
      .mockResolvedValueOnce(jsonResponse({ error: 'temporary' }, { status: 503 }))
      .mockResolvedValueOnce(jsonResponse({ ok: true }));
    const postPeer = new PostPeer({ apiKey: 'test-key', fetch, maxRetries: 2 });

    const request = postPeer.health.check();
    await vi.runAllTimersAsync();
    await expect(request).resolves.toMatchObject({ data: { ok: true } });
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  it('times out requests', async () => {
    vi.useFakeTimers();
    const fetch = vi.fn<typeof globalThis.fetch>((request) => {
      const signal = (request as Request).signal;
      return new Promise((_resolve, reject) => {
        signal.addEventListener('abort', () => reject(signal.reason), { once: true });
      });
    });
    const postPeer = new PostPeer({
      apiKey: 'test-key',
      fetch,
      maxRetries: 0,
      timeout: 25,
    });

    const request = postPeer.health.check();
    const rejection = expect(request).rejects.toBeInstanceOf(APIConnectionTimeoutError);
    await vi.advanceTimersByTimeAsync(25);
    await rejection;
  });

  it('creates a new isolated client with withOptions', () => {
    const postPeer = new PostPeer({ apiKey: 'first-key', maxRetries: 0 });
    const other = postPeer.withOptions({ apiKey: 'second-key' });

    expect(other).not.toBe(postPeer);
    expect(other.apiKey).toBe('second-key');
    expect(postPeer.apiKey).toBe('first-key');
  });
});
