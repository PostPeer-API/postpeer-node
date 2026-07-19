import { createClient, type Client } from './generated/client';
import { PostPeerApi } from './generated/sdk.gen';
import {
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  createAPIError,
  PostPeerError,
} from './errors';
import { VERSION } from './version';

export interface ClientOptions {
  /** Defaults to `process.env.POSTPEER_API_KEY`. */
  apiKey?: string;
  /** @default "https://api.postpeer.dev" */
  baseURL?: string;
  /** Request timeout in milliseconds. @default 60000 */
  timeout?: number;
  /** Number of retries for transient failures. @default 2 */
  maxRetries?: number;
  defaultHeaders?: HeadersInit;
  fetch?: typeof globalThis.fetch;
}

const DEFAULT_BASE_URL = 'https://api.postpeer.dev';
const DEFAULT_TIMEOUT = 60_000;
const DEFAULT_MAX_RETRIES = 2;
const RETRYABLE_STATUS_CODES = new Set([408, 409, 429]);

const isRetryableResponse = (response: Response): boolean =>
  RETRYABLE_STATUS_CODES.has(response.status) || response.status >= 500;

const retryDelay = (attempt: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, Math.min(250 * 2 ** attempt, 2_000)));

const validateNonNegativeInteger = (name: string, value: number): void => {
  if (!Number.isInteger(value) || value < 0) {
    throw new PostPeerError(`${name} must be a non-negative integer.`);
  }
};

const createPostPeerFetch = ({
  fetchImplementation,
  maxRetries,
  timeout,
}: {
  fetchImplementation: typeof globalThis.fetch;
  maxRetries: number;
  timeout: number;
}): typeof globalThis.fetch => {
  return async (input, init) => {
    const template = input instanceof Request ? input : new Request(input, init);

    for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
      const timeoutController = new AbortController();
      const timer = setTimeout(
        () => timeoutController.abort(new DOMException('Request timed out', 'TimeoutError')),
        timeout,
      );
      const signal = AbortSignal.any([template.signal, timeoutController.signal]);

      try {
        const response = await fetchImplementation(new Request(template.clone(), { signal }));
        if (attempt < maxRetries && isRetryableResponse(response)) {
          await retryDelay(attempt);
          continue;
        }
        return response;
      } catch (error) {
        if (template.signal.aborted) {
          throw new APIUserAbortError({ cause: error });
        }
        if (timeoutController.signal.aborted) {
          throw new APIConnectionTimeoutError({ cause: error });
        }
        if (attempt >= maxRetries) {
          throw new APIConnectionError('Connection failed.', { cause: error });
        }
        await retryDelay(attempt);
      } finally {
        clearTimeout(timer);
      }
    }

    throw new APIConnectionError('Connection failed.');
  };
};

/** The official Node.js client for the PostPeer API. */
export class PostPeer extends PostPeerApi {
  static readonly DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;
  static readonly DEFAULT_MAX_RETRIES = DEFAULT_MAX_RETRIES;

  readonly apiKey: string;
  readonly baseURL: string;
  readonly timeout: number;
  readonly maxRetries: number;
  readonly rawClient: Client;

  readonly #options: ClientOptions;

  constructor(options: ClientOptions = {}) {
    const apiKey = options.apiKey ?? process.env['POSTPEER_API_KEY'];
    if (!apiKey) {
      throw new PostPeerError(
        "The POSTPEER_API_KEY environment variable is missing or empty. Set it or pass new PostPeer({ apiKey: 'your-key' }).",
      );
    }

    const baseURL = options.baseURL ?? DEFAULT_BASE_URL;
    const timeout = options.timeout ?? DEFAULT_TIMEOUT;
    const maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
    validateNonNegativeInteger('timeout', timeout);
    validateNonNegativeInteger('maxRetries', maxRetries);

    const fetchImplementation = options.fetch ?? globalThis.fetch;
    if (!fetchImplementation) {
      throw new PostPeerError('No Fetch API implementation is available. Pass one with the fetch option.');
    }

    const client = createClient({
      auth: apiKey,
      baseUrl: baseURL,
      fetch: createPostPeerFetch({ fetchImplementation, maxRetries, timeout }),
      headers: {
        'User-Agent': `postpeer-node/${VERSION}`,
        ...options.defaultHeaders,
      },
      throwOnError: true,
    });

    client.interceptors.error.use((error, response) => {
      if (error instanceof PostPeerError) return error;
      if (!response) return new APIConnectionError('Connection failed.', { cause: error });
      return createAPIError(response, error);
    });

    super({ client });
    this.apiKey = apiKey;
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.maxRetries = maxRetries;
    this.rawClient = client;
    this.#options = { ...options, apiKey, baseURL, timeout, maxRetries };
  }

  withOptions(options: Partial<ClientOptions>): PostPeer {
    return new PostPeer({ ...this.#options, ...options });
  }
}

export default PostPeer;
