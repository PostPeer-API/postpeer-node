# PostPeer Node.js SDK

The official TypeScript SDK for the [PostPeer API](https://postpeer.dev), generated from PostPeer's OpenAPI contract with [Hey API](https://heyapi.dev/).

## Installation

```bash
npm install @postpeer/node
```

Node.js 20 or newer is required.

## Quick start

```ts
import PostPeer from '@postpeer/node';

const postPeer = new PostPeer(); // Uses POSTPEER_API_KEY

const { data: post } = await postPeer.posts.create({
  body: {
    content: 'Hello from PostPeer!',
    platforms: [{ platform: 'twitter', accountId: 'integration-id' }],
    publishNow: true,
  },
});

console.log(post);
```

You can also pass the key directly:

```ts
const postPeer = new PostPeer({
  apiKey: 'your-access-key',
});
```

## Configuration

```ts
const postPeer = new PostPeer({
  apiKey: 'your-access-key',
  baseURL: 'https://api.postpeer.dev',
  timeout: 60_000,
  maxRetries: 2,
  defaultHeaders: { 'X-Application': 'my-app' },
  fetch: customFetch,
});
```

Every `PostPeer` instance owns an isolated HTTP client, so separate API keys and base URLs do not interfere with one another.

## Resources

The SDK follows the API's resource structure:

```ts
postPeer.health.check();
postPeer.health.verifyAccessKey();

postPeer.posts.create({ body });
postPeer.posts.list({ query });
postPeer.posts.get({ path: { postId } });
postPeer.posts.delete({ path: { postId } });
postPeer.posts.scheduled.list();
postPeer.posts.scheduled.cancel({ path: { postId } });
postPeer.posts.scheduled.reschedule({ path: { postId }, body });

postPeer.connect.getOAuthUrl({ path: { platform }, query });
postPeer.connect.integrations.list();
postPeer.connect.integrations.disconnect({ path: { id } });

postPeer.profiles.list();
postPeer.apps.list();
postPeer.notifications.list();
postPeer.platforms.list();
postPeer.media.upload({ body });
postPeer.analytics.get({ query });
postPeer.usage.get();
postPeer.pinterest.getBoards({ query });
postPeer.tiktok.getCreatorInfo({ query });
postPeer.ai.write({ body });
postPeer.ai.generateImage({ body });
```

Request parameters are grouped under `body`, `path`, `query`, and `headers`. Responses include `data`, `request`, and `response`, giving you access to the parsed result and the native Fetch objects.

## Error handling

```ts
import PostPeer, { NotFoundError, RateLimitError } from '@postpeer/node';

try {
  await postPeer.posts.get({ path: { postId: 'missing' } });
} catch (error) {
  if (error instanceof NotFoundError) {
    console.error(error.status, error.requestId, error.message);
  } else if (error instanceof RateLimitError) {
    console.error('PostPeer rate limit reached');
  }
}
```

The SDK exports typed API, connection, timeout, and user-abort errors.

## Updating the generated SDK

The OpenAPI specification and npm releases are intentionally separate.

```bash
pnpm spec:fetch
pnpm generate
pnpm check
```

Commit `openapi.json` and `src/generated` together. This updates the code but does not publish a package. Package versions change only when a release PR is deliberately merged.

Generated files under `src/generated` must not be edited by hand.

## Versioning

PostPeer uses conservative pre-1.0 versioning:

- `0.8.0` is the first Hey API release.
- Compatible fixes and additions remain in `0.8.x`.
- A breaking SDK change moves to `0.9.0`.
- `1.0.0` will be published only when the SDK contract is considered mature.

OpenAPI changes may accumulate before a package release.

## Development

```bash
pnpm install
pnpm generate
pnpm check
```
