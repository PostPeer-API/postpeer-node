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

const client = new PostPeer(); // Uses POSTPEER_API_KEY

const { data: post } = await client.posts.create({
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
const client = new PostPeer({
  apiKey: 'your-access-key',
});
```

## Configuration

```ts
const client = new PostPeer({
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
client.health.check();
client.health.verifyAccessKey();

client.posts.create({ body });
client.posts.list({ query });
client.posts.get({ path: { postId } });
client.posts.delete({ path: { postId } });
client.posts.scheduled.list();
client.posts.scheduled.cancel({ path: { postId } });
client.posts.scheduled.reschedule({ path: { postId }, body });

client.connect.getOAuthUrl({ path: { platform }, query });
client.connect.integrations.list();
client.connect.integrations.disconnect({ path: { id } });

client.profiles.list();
client.apps.list();
client.notifications.list();
client.platforms.list();
client.media.upload({ body });
client.analytics.get({ query });
client.usage.get();
client.pinterest.getBoards({ query });
client.tiktok.getCreatorInfo({ query });
client.ai.write({ body });
client.ai.generateImage({ body });
```

Request parameters are grouped under `body`, `path`, `query`, and `headers`. Responses include `data`, `request`, and `response`, giving you access to the parsed result and the native Fetch objects.

## Error handling

```ts
import PostPeer, { NotFoundError, RateLimitError } from '@postpeer/node';

const client = new PostPeer();

try {
  await client.posts.get({ path: { postId: 'missing' } });
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

Commit `openapi.json` and `src/generated` together. This updates the code but does not publish a package.

For a release, update `package.json`, `src/version.ts`, and `CHANGELOG.md`, run `pnpm check`, then publish with `npm publish --access public`.

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
