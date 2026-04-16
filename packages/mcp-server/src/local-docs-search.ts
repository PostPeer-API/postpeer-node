// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'check',
    endpoint: '/v1/health',
    httpMethod: 'get',
    summary: 'Health check',
    description: 'Health check',
    stainlessPath: '(resource) health > (method) check',
    qualified: 'client.health.check',
    response: '{ ok: boolean; }',
    markdown:
      "## check\n\n`client.health.check(): { ok: boolean; }`\n\n**get** `/v1/health`\n\nHealth check\n\n### Returns\n\n- `{ ok: boolean; }`\n\n  - `ok: boolean`\n\n### Example\n\n```typescript\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer();\n\nconst response = await client.health.check();\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example: 'curl https://api.example.com/v1/health \\\n    -H "x-access-key: $POSTPEER_API_KEY"',
      },
      python: {
        method: 'health.check',
        example:
          'import os\nfrom postpeer import PostPeer\n\nclient = PostPeer(\n    api_key=os.environ.get("POSTPEER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.health.check()\nprint(response.ok)',
      },
      typescript: {
        method: 'client.health.check',
        example:
          "import PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  apiKey: process.env['POSTPEER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.health.check();\n\nconsole.log(response.ok);",
      },
    },
  },
  {
    name: 'verify_access_key',
    endpoint: '/v1/health/auth',
    httpMethod: 'get',
    summary: 'Verify that the provided access key is valid',
    description: 'Verify that the provided access key is valid',
    stainlessPath: '(resource) health > (method) verify_access_key',
    qualified: 'client.health.verifyAccessKey',
    response: '{ ok: boolean; }',
    markdown:
      "## verify_access_key\n\n`client.health.verifyAccessKey(): { ok: boolean; }`\n\n**get** `/v1/health/auth`\n\nVerify that the provided access key is valid\n\n### Returns\n\n- `{ ok: boolean; }`\n\n  - `ok: boolean`\n\n### Example\n\n```typescript\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer();\n\nconst response = await client.health.verifyAccessKey();\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example: 'curl https://api.example.com/v1/health/auth \\\n    -H "x-access-key: $POSTPEER_API_KEY"',
      },
      python: {
        method: 'health.verify_access_key',
        example:
          'import os\nfrom postpeer import PostPeer\n\nclient = PostPeer(\n    api_key=os.environ.get("POSTPEER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.health.verify_access_key()\nprint(response.ok)',
      },
      typescript: {
        method: 'client.health.verifyAccessKey',
        example:
          "import PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  apiKey: process.env['POSTPEER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.health.verifyAccessKey();\n\nconsole.log(response.ok);",
      },
    },
  },
  {
    name: 'get_oauth_url',
    endpoint: '/v1/connect/{platform}',
    httpMethod: 'get',
    summary: 'Get OAuth URL for a platform',
    description: 'Get OAuth URL for a platform',
    stainlessPath: '(resource) connect > (method) get_oauth_url',
    qualified: 'client.connect.getOAuthURL',
    params: [
      "platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin';",
      'redirectUri?: string;',
    ],
    response: '{ url: string; }',
    markdown:
      "## get_oauth_url\n\n`client.connect.getOAuthURL(platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin', redirectUri?: string): { url: string; }`\n\n**get** `/v1/connect/{platform}`\n\nGet OAuth URL for a platform\n\n### Parameters\n\n- `platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'`\n\n- `redirectUri?: string`\n  URL to redirect to after a successful connection\n\n### Returns\n\n- `{ url: string; }`\n\n  - `url: string`\n\n### Example\n\n```typescript\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer();\n\nconst response = await client.connect.getOAuthURL('twitter');\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.example.com/v1/connect/$PLATFORM \\\n    -H "x-access-key: $POSTPEER_API_KEY"',
      },
      python: {
        method: 'connect.get_oauth_url',
        example:
          'import os\nfrom postpeer import PostPeer\n\nclient = PostPeer(\n    api_key=os.environ.get("POSTPEER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.connect.get_oauth_url(\n    platform="twitter",\n)\nprint(response.url)',
      },
      typescript: {
        method: 'client.connect.getOAuthURL',
        example:
          "import PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  apiKey: process.env['POSTPEER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.connect.getOAuthURL('twitter');\n\nconsole.log(response.url);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/connect/integrations',
    httpMethod: 'get',
    summary: 'List all integrations connected to this project',
    description: 'List all integrations connected to this project',
    stainlessPath: '(resource) connect.integrations > (method) list',
    qualified: 'client.connect.integrations.list',
    response:
      "{ integrations: { id: string; createdAt: string; displayName: string; imageUrl: string; platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'; platformUserId: string; }[]; success: boolean; }",
    markdown:
      "## list\n\n`client.connect.integrations.list(): { integrations: object[]; success: boolean; }`\n\n**get** `/v1/connect/integrations`\n\nList all integrations connected to this project\n\n### Returns\n\n- `{ integrations: { id: string; createdAt: string; displayName: string; imageUrl: string; platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'; platformUserId: string; }[]; success: boolean; }`\n\n  - `integrations: { id: string; createdAt: string; displayName: string; imageUrl: string; platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'; platformUserId: string; }[]`\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer();\n\nconst integrations = await client.connect.integrations.list();\n\nconsole.log(integrations);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.example.com/v1/connect/integrations \\\n    -H "x-access-key: $POSTPEER_API_KEY"',
      },
      python: {
        method: 'connect.integrations.list',
        example:
          'import os\nfrom postpeer import PostPeer\n\nclient = PostPeer(\n    api_key=os.environ.get("POSTPEER_API_KEY"),  # This is the default and can be omitted\n)\nintegrations = client.connect.integrations.list()\nprint(integrations.integrations)',
      },
      typescript: {
        method: 'client.connect.integrations.list',
        example:
          "import PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  apiKey: process.env['POSTPEER_API_KEY'], // This is the default and can be omitted\n});\n\nconst integrations = await client.connect.integrations.list();\n\nconsole.log(integrations.integrations);",
      },
    },
  },
  {
    name: 'disconnect',
    endpoint: '/v1/connect/integrations/{id}',
    httpMethod: 'delete',
    summary: 'Disconnect a platform integration',
    description: 'Disconnect a platform integration',
    stainlessPath: '(resource) connect.integrations > (method) disconnect',
    qualified: 'client.connect.integrations.disconnect',
    params: ['id: string;'],
    response: '{ message: string; success: boolean; }',
    markdown:
      "## disconnect\n\n`client.connect.integrations.disconnect(id: string): { message: string; success: boolean; }`\n\n**delete** `/v1/connect/integrations/{id}`\n\nDisconnect a platform integration\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ message: string; success: boolean; }`\n\n  - `message: string`\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer();\n\nconst response = await client.connect.integrations.disconnect('id');\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.example.com/v1/connect/integrations/$ID \\\n    -X DELETE \\\n    -H "x-access-key: $POSTPEER_API_KEY"',
      },
      python: {
        method: 'connect.integrations.disconnect',
        example:
          'import os\nfrom postpeer import PostPeer\n\nclient = PostPeer(\n    api_key=os.environ.get("POSTPEER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.connect.integrations.disconnect(\n    "id",\n)\nprint(response.message)',
      },
      typescript: {
        method: 'client.connect.integrations.disconnect',
        example:
          "import PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  apiKey: process.env['POSTPEER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.connect.integrations.disconnect('id');\n\nconsole.log(response.message);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/platforms',
    httpMethod: 'get',
    summary: 'List available platforms and their status',
    description: 'List available platforms and their status',
    stainlessPath: '(resource) platforms > (method) list',
    qualified: 'client.platforms.list',
    response:
      "{ platforms: { name: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'; status: 'prod' | 'beta' | 'dev'; }[]; }",
    markdown:
      "## list\n\n`client.platforms.list(): { platforms: object[]; }`\n\n**get** `/v1/platforms`\n\nList available platforms and their status\n\n### Returns\n\n- `{ platforms: { name: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'; status: 'prod' | 'beta' | 'dev'; }[]; }`\n\n  - `platforms: { name: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'; status: 'prod' | 'beta' | 'dev'; }[]`\n\n### Example\n\n```typescript\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer();\n\nconst platforms = await client.platforms.list();\n\nconsole.log(platforms);\n```",
    perLanguage: {
      http: {
        example: 'curl https://api.example.com/v1/platforms \\\n    -H "x-access-key: $POSTPEER_API_KEY"',
      },
      python: {
        method: 'platforms.list',
        example:
          'import os\nfrom postpeer import PostPeer\n\nclient = PostPeer(\n    api_key=os.environ.get("POSTPEER_API_KEY"),  # This is the default and can be omitted\n)\nplatforms = client.platforms.list()\nprint(platforms.platforms)',
      },
      typescript: {
        method: 'client.platforms.list',
        example:
          "import PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  apiKey: process.env['POSTPEER_API_KEY'], // This is the default and can be omitted\n});\n\nconst platforms = await client.platforms.list();\n\nconsole.log(platforms.platforms);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/posts/',
    httpMethod: 'post',
    summary: 'Publish a post to one or more social media platforms',
    description: 'Publish a post to one or more social media platforms',
    stainlessPath: '(resource) posts > (method) create',
    qualified: 'client.posts.create',
    params: [
      'content: string;',
      "platforms: { accountId: string; platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'; platformSpecificData?: { communityId?: string; poll?: { duration_minutes: number; options: string[]; }; replySettings?: 'following' | 'mentionedUsers' | 'subscribers' | 'verified'; replyToTweetId?: string; shareWithFollowers?: boolean; threadItems?: { content: string; mediaItems?: { type: 'image' | 'video' | 'gif'; url: string; }[]; }[]; } | { categoryId?: string; containsSyntheticMedia?: boolean; firstComment?: string; madeForKids?: boolean; tags?: string[]; title?: string; visibility?: 'public' | 'private' | 'unlisted'; } | { auto_add_music?: boolean; brand_content_toggle?: boolean; brand_organic_toggle?: boolean; disable_comment?: boolean; disable_duet?: boolean; disable_stitch?: boolean; draft?: boolean; is_aigc?: boolean; photo_cover_index?: number; privacy_level?: 'PUBLIC_TO_EVERYONE' | 'MUTUAL_FOLLOW_FRIENDS' | 'FOLLOWER_OF_CREATOR' | 'SELF_ONLY'; video_cover_timestamp_ms?: number; } | { boardId: string; altText?: string; coverImageUrl?: string; dominantColor?: string; link?: string; title?: string; } | { article_description?: string; article_title?: string; article_url?: string; visibility?: 'PUBLIC' | 'CONNECTIONS'; }; }[];",
      "mediaItems?: { type: 'image' | 'video' | 'gif'; url: string; thumbnail?: string; }[];",
      'publishNow?: boolean;',
      'scheduledFor?: string;',
      'timezone?: string;',
    ],
    response:
      "{ platforms: { platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'; success: boolean; error?: string; platformPostUrl?: string; }[]; postId: string; status: 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial'; success: boolean; scheduledFor?: string; }",
    markdown:
      "## create\n\n`client.posts.create(content: string, platforms: { accountId: string; platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'; platformSpecificData?: { communityId?: string; poll?: object; replySettings?: 'following' | 'mentionedUsers' | 'subscribers' | 'verified'; replyToTweetId?: string; shareWithFollowers?: boolean; threadItems?: object[]; } | { categoryId?: string; containsSyntheticMedia?: boolean; firstComment?: string; madeForKids?: boolean; tags?: string[]; title?: string; visibility?: 'public' | 'private' | 'unlisted'; } | { auto_add_music?: boolean; brand_content_toggle?: boolean; brand_organic_toggle?: boolean; disable_comment?: boolean; disable_duet?: boolean; disable_stitch?: boolean; draft?: boolean; is_aigc?: boolean; photo_cover_index?: number; privacy_level?: 'PUBLIC_TO_EVERYONE' | 'MUTUAL_FOLLOW_FRIENDS' | 'FOLLOWER_OF_CREATOR' | 'SELF_ONLY'; video_cover_timestamp_ms?: number; } | { boardId: string; altText?: string; coverImageUrl?: string; dominantColor?: string; link?: string; title?: string; } | { article_description?: string; article_title?: string; article_url?: string; visibility?: 'PUBLIC' | 'CONNECTIONS'; }; }[], mediaItems?: { type: 'image' | 'video' | 'gif'; url: string; thumbnail?: string; }[], publishNow?: boolean, scheduledFor?: string, timezone?: string): { platforms: object[]; postId: string; status: status; success: boolean; scheduledFor?: string; }`\n\n**post** `/v1/posts/`\n\nPublish a post to one or more social media platforms\n\n### Parameters\n\n- `content: string`\n  Post text body\n\n- `platforms: { accountId: string; platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'; platformSpecificData?: { communityId?: string; poll?: { duration_minutes: number; options: string[]; }; replySettings?: 'following' | 'mentionedUsers' | 'subscribers' | 'verified'; replyToTweetId?: string; shareWithFollowers?: boolean; threadItems?: { content: string; mediaItems?: { type: 'image' | 'video' | 'gif'; url: string; }[]; }[]; } | { categoryId?: string; containsSyntheticMedia?: boolean; firstComment?: string; madeForKids?: boolean; tags?: string[]; title?: string; visibility?: 'public' | 'private' | 'unlisted'; } | { auto_add_music?: boolean; brand_content_toggle?: boolean; brand_organic_toggle?: boolean; disable_comment?: boolean; disable_duet?: boolean; disable_stitch?: boolean; draft?: boolean; is_aigc?: boolean; photo_cover_index?: number; privacy_level?: 'PUBLIC_TO_EVERYONE' | 'MUTUAL_FOLLOW_FRIENDS' | 'FOLLOWER_OF_CREATOR' | 'SELF_ONLY'; video_cover_timestamp_ms?: number; } | { boardId: string; altText?: string; coverImageUrl?: string; dominantColor?: string; link?: string; title?: string; } | { article_description?: string; article_title?: string; article_url?: string; visibility?: 'PUBLIC' | 'CONNECTIONS'; }; }[]`\n  Target platform accounts to publish to\n\n- `mediaItems?: { type: 'image' | 'video' | 'gif'; url: string; thumbnail?: string; }[]`\n  Media attachments (images, videos, GIFs)\n\n- `publishNow?: boolean`\n  Publish immediately. Required when scheduledFor is omitted.\n\n- `scheduledFor?: string`\n  ISO 8601 datetime to schedule the post for future publishing\n\n- `timezone?: string`\n  IANA timezone for the scheduled time (e.g. America/New_York). Defaults to UTC.\n\n### Returns\n\n- `{ platforms: { platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'; success: boolean; error?: string; platformPostUrl?: string; }[]; postId: string; status: 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial'; success: boolean; scheduledFor?: string; }`\n\n  - `platforms: { platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'; success: boolean; error?: string; platformPostUrl?: string; }[]`\n  - `postId: string`\n  - `status: 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial'`\n  - `success: boolean`\n  - `scheduledFor?: string`\n\n### Example\n\n```typescript\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer();\n\nconst post = await client.posts.create({ content: 'Hello world!', platforms: [{ accountId: '<your-account-id>', platform: 'twitter' }] });\n\nconsole.log(post);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.example.com/v1/posts/ \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-access-key: $POSTPEER_API_KEY" \\\n    -d \'{\n          "content": "Hello world!",\n          "platforms": [\n            {\n              "accountId": "<your-account-id>",\n              "platform": "twitter"\n            }\n          ]\n        }\'',
      },
      python: {
        method: 'posts.create',
        example:
          'import os\nfrom postpeer import PostPeer\n\nclient = PostPeer(\n    api_key=os.environ.get("POSTPEER_API_KEY"),  # This is the default and can be omitted\n)\npost = client.posts.create(\n    content="Hello world!",\n    platforms=[{\n        "platform": "twitter",\n        "account_id": "<your-account-id>",\n    }],\n    publish_now=True,\n)\nprint(post.platforms)',
      },
      typescript: {
        method: 'client.posts.create',
        example:
          "import PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  apiKey: process.env['POSTPEER_API_KEY'], // This is the default and can be omitted\n});\n\nconst post = await client.posts.create({\n  content: 'Hello world!',\n  platforms: [{ platform: 'twitter', accountId: '<your-account-id>' }],\n  publishNow: true,\n});\n\nconsole.log(post.platforms);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/posts/',
    httpMethod: 'get',
    summary: 'List all posts for the project',
    description:
      'Returns a paginated list of posts. Filter by status, platform (OR logic), and date ranges. Published posts include platformPostUrl per platform.',
    stainlessPath: '(resource) posts > (method) list',
    qualified: 'client.posts.list',
    params: [
      'createdAfter?: string;',
      'createdBefore?: string;',
      'limit?: number;',
      'offset?: number;',
      "platform?: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'[];",
      'scheduledAfter?: string;',
      'scheduledBefore?: string;',
      "sort?: 'asc' | 'desc';",
      "status?: 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial';",
    ],
    response:
      '{ posts: { content: string; createdAt: string; crosspostingEnabled: boolean; mediaItems: object[]; platforms: object[]; postId: string; rawRequestBody: object; scheduledFor: string; status: status; timezone: string; updatedAt: string; }[]; success: boolean; total: number; }',
    markdown:
      "## list\n\n`client.posts.list(createdAfter?: string, createdBefore?: string, limit?: number, offset?: number, platform?: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'[], scheduledAfter?: string, scheduledBefore?: string, sort?: 'asc' | 'desc', status?: 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial'): { posts: post_summary[]; success: boolean; total: number; }`\n\n**get** `/v1/posts/`\n\nReturns a paginated list of posts. Filter by status, platform (OR logic), and date ranges. Published posts include platformPostUrl per platform.\n\n### Parameters\n\n- `createdAfter?: string`\n  ISO 8601 lower bound on createdAt\n\n- `createdBefore?: string`\n  ISO 8601 upper bound on createdAt\n\n- `limit?: number`\n  Page size (max 100)\n\n- `offset?: number`\n  Number of posts to skip\n\n- `platform?: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'[]`\n  Filter by platform (repeatable — OR logic)\n\n- `scheduledAfter?: string`\n  ISO 8601 lower bound on scheduledFor\n\n- `scheduledBefore?: string`\n  ISO 8601 upper bound on scheduledFor\n\n- `sort?: 'asc' | 'desc'`\n  Sort direction by createdAt\n\n- `status?: 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial'`\n\n### Returns\n\n- `{ posts: { content: string; createdAt: string; crosspostingEnabled: boolean; mediaItems: object[]; platforms: object[]; postId: string; rawRequestBody: object; scheduledFor: string; status: status; timezone: string; updatedAt: string; }[]; success: boolean; total: number; }`\n\n  - `posts: { content: string; createdAt: string; crosspostingEnabled: boolean; mediaItems: { filename: string; mimeType: string; size: number; type: 'image' | 'video' | 'gif'; url: string; }[]; platforms: { errorMessage: string; platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'; platformPostId: string; platformPostUrl: string; publishedAt: string; status: 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial'; }[]; postId: string; rawRequestBody: object; scheduledFor: string; status: 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial'; timezone: string; updatedAt: string; }[]`\n  - `success: boolean`\n  - `total: number`\n\n### Example\n\n```typescript\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer();\n\nconst posts = await client.posts.list();\n\nconsole.log(posts);\n```",
    perLanguage: {
      http: {
        example: 'curl https://api.example.com/v1/posts/ \\\n    -H "x-access-key: $POSTPEER_API_KEY"',
      },
      python: {
        method: 'posts.list',
        example:
          'import os\nfrom postpeer import PostPeer\n\nclient = PostPeer(\n    api_key=os.environ.get("POSTPEER_API_KEY"),  # This is the default and can be omitted\n)\nposts = client.posts.list()\nprint(posts.posts)',
      },
      typescript: {
        method: 'client.posts.list',
        example:
          "import PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  apiKey: process.env['POSTPEER_API_KEY'], // This is the default and can be omitted\n});\n\nconst posts = await client.posts.list();\n\nconsole.log(posts.posts);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/posts/{postId}',
    httpMethod: 'get',
    summary: 'Get a single post by ID',
    description: 'Get a single post by ID',
    stainlessPath: '(resource) posts > (method) retrieve',
    qualified: 'client.posts.retrieve',
    params: ['postId: string;'],
    response:
      '{ post: { content: string; createdAt: string; crosspostingEnabled: boolean; mediaItems: object[]; platforms: object[]; postId: string; rawRequestBody: object; scheduledFor: string; status: status; timezone: string; updatedAt: string; }; success: boolean; }',
    markdown:
      "## retrieve\n\n`client.posts.retrieve(postId: string): { post: post_summary; success: boolean; }`\n\n**get** `/v1/posts/{postId}`\n\nGet a single post by ID\n\n### Parameters\n\n- `postId: string`\n\n### Returns\n\n- `{ post: { content: string; createdAt: string; crosspostingEnabled: boolean; mediaItems: object[]; platforms: object[]; postId: string; rawRequestBody: object; scheduledFor: string; status: status; timezone: string; updatedAt: string; }; success: boolean; }`\n\n  - `post: { content: string; createdAt: string; crosspostingEnabled: boolean; mediaItems: { filename: string; mimeType: string; size: number; type: 'image' | 'video' | 'gif'; url: string; }[]; platforms: { errorMessage: string; platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'; platformPostId: string; platformPostUrl: string; publishedAt: string; status: 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial'; }[]; postId: string; rawRequestBody: object; scheduledFor: string; status: 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial'; timezone: string; updatedAt: string; }`\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer();\n\nconst post = await client.posts.retrieve('postId');\n\nconsole.log(post);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.example.com/v1/posts/$POST_ID \\\n    -H "x-access-key: $POSTPEER_API_KEY"',
      },
      python: {
        method: 'posts.retrieve',
        example:
          'import os\nfrom postpeer import PostPeer\n\nclient = PostPeer(\n    api_key=os.environ.get("POSTPEER_API_KEY"),  # This is the default and can be omitted\n)\npost = client.posts.retrieve(\n    "postId",\n)\nprint(post.post)',
      },
      typescript: {
        method: 'client.posts.retrieve',
        example:
          "import PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  apiKey: process.env['POSTPEER_API_KEY'], // This is the default and can be omitted\n});\n\nconst post = await client.posts.retrieve('postId');\n\nconsole.log(post.post);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/posts/{postId}',
    httpMethod: 'delete',
    summary: 'Delete a post by ID',
    description: 'Delete a post by ID',
    stainlessPath: '(resource) posts > (method) delete',
    qualified: 'client.posts.delete',
    params: ['postId: string;'],
    response: '{ success: boolean; }',
    markdown:
      "## delete\n\n`client.posts.delete(postId: string): { success: boolean; }`\n\n**delete** `/v1/posts/{postId}`\n\nDelete a post by ID\n\n### Parameters\n\n- `postId: string`\n\n### Returns\n\n- `{ success: boolean; }`\n\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer();\n\nconst post = await client.posts.delete('postId');\n\nconsole.log(post);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.example.com/v1/posts/$POST_ID \\\n    -X DELETE \\\n    -H "x-access-key: $POSTPEER_API_KEY"',
      },
      python: {
        method: 'posts.delete',
        example:
          'import os\nfrom postpeer import PostPeer\n\nclient = PostPeer(\n    api_key=os.environ.get("POSTPEER_API_KEY"),  # This is the default and can be omitted\n)\npost = client.posts.delete(\n    "postId",\n)\nprint(post.success)',
      },
      typescript: {
        method: 'client.posts.delete',
        example:
          "import PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  apiKey: process.env['POSTPEER_API_KEY'], // This is the default and can be omitted\n});\n\nconst post = await client.posts.delete('postId');\n\nconsole.log(post.success);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/posts/scheduled/',
    httpMethod: 'get',
    summary: 'List all scheduled posts',
    description: 'List all scheduled posts',
    stainlessPath: '(resource) posts.scheduled > (method) list',
    qualified: 'client.posts.scheduled.list',
    response:
      "{ posts: { content: string; createdAt: string; platforms: { platform: string; status: string; }[]; postId: string; scheduledFor: string; timezone: string; mediaItems?: { type: 'image' | 'video' | 'gif'; url: string; thumbnail?: string; }[]; }[]; success: boolean; }",
    markdown:
      "## list\n\n`client.posts.scheduled.list(): { posts: object[]; success: boolean; }`\n\n**get** `/v1/posts/scheduled/`\n\nList all scheduled posts\n\n### Returns\n\n- `{ posts: { content: string; createdAt: string; platforms: { platform: string; status: string; }[]; postId: string; scheduledFor: string; timezone: string; mediaItems?: { type: 'image' | 'video' | 'gif'; url: string; thumbnail?: string; }[]; }[]; success: boolean; }`\n\n  - `posts: { content: string; createdAt: string; platforms: { platform: string; status: string; }[]; postId: string; scheduledFor: string; timezone: string; mediaItems?: { type: 'image' | 'video' | 'gif'; url: string; thumbnail?: string; }[]; }[]`\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer();\n\nconst scheduleds = await client.posts.scheduled.list();\n\nconsole.log(scheduleds);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.example.com/v1/posts/scheduled/ \\\n    -H "x-access-key: $POSTPEER_API_KEY"',
      },
      python: {
        method: 'posts.scheduled.list',
        example:
          'import os\nfrom postpeer import PostPeer\n\nclient = PostPeer(\n    api_key=os.environ.get("POSTPEER_API_KEY"),  # This is the default and can be omitted\n)\nscheduleds = client.posts.scheduled.list()\nprint(scheduleds.posts)',
      },
      typescript: {
        method: 'client.posts.scheduled.list',
        example:
          "import PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  apiKey: process.env['POSTPEER_API_KEY'], // This is the default and can be omitted\n});\n\nconst scheduleds = await client.posts.scheduled.list();\n\nconsole.log(scheduleds.posts);",
      },
    },
  },
  {
    name: 'cancel',
    endpoint: '/v1/posts/scheduled/{postId}',
    httpMethod: 'delete',
    summary: 'Cancel a scheduled post (moves it back to draft)',
    description: 'Cancel a scheduled post (moves it back to draft)',
    stainlessPath: '(resource) posts.scheduled > (method) cancel',
    qualified: 'client.posts.scheduled.cancel',
    params: ['postId: string;'],
    response: '{ message: string; success: boolean; }',
    markdown:
      "## cancel\n\n`client.posts.scheduled.cancel(postId: string): { message: string; success: boolean; }`\n\n**delete** `/v1/posts/scheduled/{postId}`\n\nCancel a scheduled post (moves it back to draft)\n\n### Parameters\n\n- `postId: string`\n\n### Returns\n\n- `{ message: string; success: boolean; }`\n\n  - `message: string`\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer();\n\nconst response = await client.posts.scheduled.cancel('postId');\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.example.com/v1/posts/scheduled/$POST_ID \\\n    -X DELETE \\\n    -H "x-access-key: $POSTPEER_API_KEY"',
      },
      python: {
        method: 'posts.scheduled.cancel',
        example:
          'import os\nfrom postpeer import PostPeer\n\nclient = PostPeer(\n    api_key=os.environ.get("POSTPEER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.posts.scheduled.cancel(\n    "postId",\n)\nprint(response.message)',
      },
      typescript: {
        method: 'client.posts.scheduled.cancel',
        example:
          "import PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  apiKey: process.env['POSTPEER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.posts.scheduled.cancel('postId');\n\nconsole.log(response.message);",
      },
    },
  },
  {
    name: 'reschedule',
    endpoint: '/v1/posts/scheduled/{postId}',
    httpMethod: 'patch',
    summary: 'Reschedule a post to a new time',
    description: 'Reschedule a post to a new time',
    stainlessPath: '(resource) posts.scheduled > (method) reschedule',
    qualified: 'client.posts.scheduled.reschedule',
    params: ['postId: string;', 'scheduledFor: string;', 'timezone?: string;'],
    response: '{ message: string; scheduledFor: string; success: boolean; }',
    markdown:
      "## reschedule\n\n`client.posts.scheduled.reschedule(postId: string, scheduledFor: string, timezone?: string): { message: string; scheduledFor: string; success: boolean; }`\n\n**patch** `/v1/posts/scheduled/{postId}`\n\nReschedule a post to a new time\n\n### Parameters\n\n- `postId: string`\n\n- `scheduledFor: string`\n  New ISO 8601 datetime to schedule the post\n\n- `timezone?: string`\n  IANA timezone\n\n### Returns\n\n- `{ message: string; scheduledFor: string; success: boolean; }`\n\n  - `message: string`\n  - `scheduledFor: string`\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer();\n\nconst response = await client.posts.scheduled.reschedule('postId', { scheduledFor: '2019-12-27T18:11:19.117Z' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.example.com/v1/posts/scheduled/$POST_ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-access-key: $POSTPEER_API_KEY" \\\n    -d \'{\n          "scheduledFor": "2019-12-27T18:11:19.117Z"\n        }\'',
      },
      python: {
        method: 'posts.scheduled.reschedule',
        example:
          'import os\nfrom datetime import datetime\nfrom postpeer import PostPeer\n\nclient = PostPeer(\n    api_key=os.environ.get("POSTPEER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.posts.scheduled.reschedule(\n    post_id="postId",\n    scheduled_for=datetime.fromisoformat("2019-12-27T18:11:19.117"),\n)\nprint(response.message)',
      },
      typescript: {
        method: 'client.posts.scheduled.reschedule',
        example:
          "import PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  apiKey: process.env['POSTPEER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.posts.scheduled.reschedule('postId', {\n  scheduledFor: '2019-12-27T18:11:19.117Z',\n});\n\nconsole.log(response.message);",
      },
    },
  },
  {
    name: 'upload',
    endpoint: '/v1/media/upload',
    httpMethod: 'post',
    summary: 'Get a presigned S3 URL to upload a media file',
    description: 'Get a presigned S3 URL to upload a media file',
    stainlessPath: '(resource) media > (method) upload',
    qualified: 'client.media.upload',
    params: ['filename: string;', 'mimeType: string;'],
    response: '{ data: { publicUrl: string; uploadUrl: string; }; success: boolean; }',
    markdown:
      "## upload\n\n`client.media.upload(filename: string, mimeType: string): { data: object; success: boolean; }`\n\n**post** `/v1/media/upload`\n\nGet a presigned S3 URL to upload a media file\n\n### Parameters\n\n- `filename: string`\n\n- `mimeType: string`\n\n### Returns\n\n- `{ data: { publicUrl: string; uploadUrl: string; }; success: boolean; }`\n\n  - `data: { publicUrl: string; uploadUrl: string; }`\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer();\n\nconst response = await client.media.upload({ filename: 'x', mimeType: 'x' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.example.com/v1/media/upload \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-access-key: $POSTPEER_API_KEY" \\\n    -d \'{\n          "filename": "x",\n          "mimeType": "x"\n        }\'',
      },
      python: {
        method: 'media.upload',
        example:
          'import os\nfrom postpeer import PostPeer\n\nclient = PostPeer(\n    api_key=os.environ.get("POSTPEER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.media.upload(\n    filename="x",\n    mime_type="x",\n)\nprint(response.data)',
      },
      typescript: {
        method: 'client.media.upload',
        example:
          "import PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  apiKey: process.env['POSTPEER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.media.upload({ filename: 'x', mimeType: 'x' });\n\nconsole.log(response.data);",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'python',
    content:
      '# Post Peer Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/postpeer.svg?label=pypi%20(stable))](https://pypi.org/project/postpeer/)\n\nThe Post Peer Python library provides convenient access to the Post Peer REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Post Peer MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=postpeer-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsInBvc3RwZWVyLW1jcCJdLCJlbnYiOnsiUE9TVFBFRVJfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22postpeer-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22postpeer-mcp%22%5D%2C%22env%22%3A%7B%22POSTPEER_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\n The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from this staging repo\npip install git+ssh://git@github.com/stainless-sdks/postpeer-python.git\n```\n> [!NOTE]\n> Once this package is [published to PyPI](https://www.stainless.com/docs/guides/publish), this will become: `pip install postpeer`\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom postpeer import PostPeer\n\nclient = PostPeer(\n    api_key=os.environ.get("POSTPEER_API_KEY"),  # This is the default and can be omitted\n)\n\nresponse = client.health.check()\nprint(response.ok)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `POSTPEER_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncPostPeer` instead of `PostPeer` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom postpeer import AsyncPostPeer\n\nclient = AsyncPostPeer(\n    api_key=os.environ.get("POSTPEER_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  response = await client.health.check()\n  print(response.ok)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from this staging repo\npip install \'postpeer[aiohttp] @ git+ssh://git@github.com/stainless-sdks/postpeer-python.git\'\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom postpeer import DefaultAioHttpClient\nfrom postpeer import AsyncPostPeer\n\nasync def main() -> None:\n  async with AsyncPostPeer(\n    api_key=os.environ.get("POSTPEER_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    response = await client.health.check()\n    print(response.ok)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `postpeer.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `postpeer.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `postpeer.APIError`.\n\n```python\nimport postpeer\nfrom postpeer import PostPeer\n\nclient = PostPeer()\n\ntry:\n    client.health.check()\nexcept postpeer.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept postpeer.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept postpeer.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom postpeer import PostPeer\n\n# Configure the default for all requests:\nclient = PostPeer(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).health.check()\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom postpeer import PostPeer\n\n# Configure the default for all requests:\nclient = PostPeer(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = PostPeer(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).health.check()\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `POST_PEER_LOG` to `info`.\n\n```shell\n$ export POST_PEER_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom postpeer import PostPeer\n\nclient = PostPeer()\nresponse = client.health.with_raw_response.check()\nprint(response.headers.get(\'X-My-Header\'))\n\nhealth = response.parse()  # get the object that `health.check()` would have returned\nprint(health.ok)\n```\n\nThese methods return an [`APIResponse`](https://github.com/stainless-sdks/postpeer-python/tree/main/src/postpeer/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/stainless-sdks/postpeer-python/tree/main/src/postpeer/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.health.with_streaming_response.check() as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom postpeer import PostPeer, DefaultHttpxClient\n\nclient = PostPeer(\n    # Or use the `POST_PEER_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom postpeer import PostPeer\n\nwith PostPeer() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/stainless-sdks/postpeer-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport postpeer\nprint(postpeer.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Post Peer TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/@postpeer/node.svg?label=npm%20(stable))](https://npmjs.org/package/@postpeer/node) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@postpeer/node)\n\nThis library provides convenient access to the Post Peer REST API from server-side TypeScript or JavaScript.\n\n\n\nThe full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Post Peer MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=postpeer-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsInBvc3RwZWVyLW1jcCJdLCJlbnYiOnsiUE9TVFBFRVJfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22postpeer-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22postpeer-mcp%22%5D%2C%22env%22%3A%7B%22POSTPEER_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @postpeer/node\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  apiKey: process.env['POSTPEER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.health.check();\n\nconsole.log(response.ok);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  apiKey: process.env['POSTPEER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response: PostPeer.HealthCheckResponse = await client.health.check();\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst response = await client.health.check().catch(async (err) => {\n  if (err instanceof PostPeer.APIError) {\n    console.log(err.status); // 400\n    console.log(err.name); // BadRequestError\n    console.log(err.headers); // {server: 'nginx', ...}\n  } else {\n    throw err;\n  }\n});\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new PostPeer({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.health.check({\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new PostPeer({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.health.check({\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new PostPeer();\n\nconst response = await client.health.check().asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: response, response: raw } = await client.health.check().withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(response.ok);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `POST_PEER_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport PostPeer from '@postpeer/node';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new PostPeer({\n  logger: logger.child({ name: 'PostPeer' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.health.check({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport PostPeer from '@postpeer/node';\nimport fetch from 'my-fetch';\n\nconst client = new PostPeer({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport PostPeer from '@postpeer/node';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new PostPeer({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport PostPeer from '@postpeer/node';\n\nconst client = new PostPeer({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport PostPeer from 'npm:@postpeer/node';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new PostPeer({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/PostPeer-API/postpeer-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
