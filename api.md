# Health

Types:

- <code><a href="./src/resources/health.ts">HealthCheckResponse</a></code>
- <code><a href="./src/resources/health.ts">HealthVerifyAccessKeyResponse</a></code>

Methods:

- <code title="get /v1/health">client.health.<a href="./src/resources/health.ts">check</a>() -> HealthCheckResponse</code>
- <code title="get /v1/health/auth">client.health.<a href="./src/resources/health.ts">verifyAccessKey</a>() -> HealthVerifyAccessKeyResponse</code>

# Connect

Types:

- <code><a href="./src/resources/connect/connect.ts">ConnectGetOAuthURLResponse</a></code>

Methods:

- <code title="get /v1/connect/{platform}">client.connect.<a href="./src/resources/connect/connect.ts">getOAuthURL</a>(platform, { ...params }) -> ConnectGetOAuthURLResponse</code>

## Integrations

Types:

- <code><a href="./src/resources/connect/integrations.ts">IntegrationListResponse</a></code>
- <code><a href="./src/resources/connect/integrations.ts">IntegrationDisconnectResponse</a></code>

Methods:

- <code title="get /v1/connect/integrations">client.connect.integrations.<a href="./src/resources/connect/integrations.ts">list</a>() -> IntegrationListResponse</code>
- <code title="delete /v1/connect/integrations/{id}">client.connect.integrations.<a href="./src/resources/connect/integrations.ts">disconnect</a>(id) -> IntegrationDisconnectResponse</code>

# Platforms

Types:

- <code><a href="./src/resources/platforms.ts">PlatformListResponse</a></code>

Methods:

- <code title="get /v1/platforms">client.platforms.<a href="./src/resources/platforms.ts">list</a>() -> PlatformListResponse</code>

# Posts

Types:

- <code><a href="./src/resources/posts/posts.ts">PostSummary</a></code>
- <code><a href="./src/resources/posts/posts.ts">Status</a></code>
- <code><a href="./src/resources/posts/posts.ts">PostRetrieveResponse</a></code>
- <code><a href="./src/resources/posts/posts.ts">PostUpdateResponse</a></code>
- <code><a href="./src/resources/posts/posts.ts">PostDeleteResponse</a></code>
- <code><a href="./src/resources/posts/posts.ts">PostRetrieveResponse</a></code>

Methods:

- <code title="get /v1/posts/{postId}">client.posts.<a href="./src/resources/posts/posts.ts">retrieve</a>(postID) -> PostRetrieveResponse</code>
- <code title="post /v1/posts/">client.posts.<a href="./src/resources/posts/posts.ts">update</a>({ ...params }) -> PostUpdateResponse</code>
- <code title="delete /v1/posts/{postId}">client.posts.<a href="./src/resources/posts/posts.ts">delete</a>(postID) -> PostDeleteResponse</code>
- <code title="get /v1/posts/">client.posts.<a href="./src/resources/posts/posts.ts">retrieve</a>({ ...params }) -> PostRetrieveResponse</code>

## Scheduled

Types:

- <code><a href="./src/resources/posts/scheduled.ts">ScheduledCancelResponse</a></code>
- <code><a href="./src/resources/posts/scheduled.ts">ScheduledRescheduleResponse</a></code>
- <code><a href="./src/resources/posts/scheduled.ts">ScheduledRetrieveResponse</a></code>

Methods:

- <code title="delete /v1/posts/scheduled/{postId}">client.posts.scheduled.<a href="./src/resources/posts/scheduled.ts">cancel</a>(postID) -> ScheduledCancelResponse</code>
- <code title="patch /v1/posts/scheduled/{postId}">client.posts.scheduled.<a href="./src/resources/posts/scheduled.ts">reschedule</a>(postID, { ...params }) -> ScheduledRescheduleResponse</code>
- <code title="get /v1/posts/scheduled/">client.posts.scheduled.<a href="./src/resources/posts/scheduled.ts">retrieve</a>() -> ScheduledRetrieveResponse</code>

# Media

Types:

- <code><a href="./src/resources/media.ts">MediaUploadResponse</a></code>

Methods:

- <code title="post /v1/media/upload">client.media.<a href="./src/resources/media.ts">upload</a>({ ...params }) -> MediaUploadResponse</code>
