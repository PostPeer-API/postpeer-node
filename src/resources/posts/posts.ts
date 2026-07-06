// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ScheduledAPI from './scheduled';
import {
  Scheduled,
  ScheduledCancelResponse,
  ScheduledListParams,
  ScheduledListResponse,
  ScheduledRescheduleParams,
  ScheduledRescheduleResponse,
} from './scheduled';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Posts extends APIResource {
  scheduled: ScheduledAPI.Scheduled = new ScheduledAPI.Scheduled(this._client);

  /**
   * Publish a post to one or more social media platforms
   *
   * @example
   * ```ts
   * const post = await client.posts.create({
   *   content: 'Hello world!',
   *   platforms: [
   *     { platform: 'twitter', accountId: '<your-account-id>' },
   *   ],
   *   publishNow: true,
   * });
   * ```
   */
  create(body: PostCreateParams, options?: RequestOptions): APIPromise<PostCreateResponse> {
    return this._client.post('/v1/posts/', { body, ...options });
  }

  /**
   * Get a single post by ID
   *
   * @example
   * ```ts
   * const post = await client.posts.retrieve('postId');
   * ```
   */
  retrieve(postID: string, options?: RequestOptions): APIPromise<PostRetrieveResponse> {
    return this._client.get(path`/v1/posts/${postID}`, options);
  }

  /**
   * Returns a paginated list of posts. Filter by status, platform (OR logic), and
   * date ranges. Published posts include platformPostUrl per platform.
   *
   * @example
   * ```ts
   * const posts = await client.posts.list();
   * ```
   */
  list(
    query: PostListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PostListResponse> {
    return this._client.get('/v1/posts/', { query, ...options });
  }

  /**
   * Delete a post by ID
   *
   * @example
   * ```ts
   * const post = await client.posts.delete('postId');
   * ```
   */
  delete(
    postID: string,
    params: PostDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PostDeleteResponse> {
    const { deleteFromPlatforms } = params ?? {};
    return this._client.delete(path`/v1/posts/${postID}`, { query: { deleteFromPlatforms }, ...options });
  }
}

export type Status = 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial';

export interface PostCreateResponse {
  platforms: Array<PostCreateResponse.Platform>;

  /**
   * id of the saved Post document
   */
  postId: string;

  status: 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial';

  /**
   * false only when every platform failed
   */
  success: boolean;

  /**
   * ISO 8601 datetime the post is scheduled for (only present for scheduled posts)
   */
  scheduledFor?: string;
}

export namespace PostCreateResponse {
  export interface Platform {
    platform:
      | 'twitter'
      | 'instagram'
      | 'youtube'
      | 'tiktok'
      | 'pinterest'
      | 'linkedin'
      | 'bluesky'
      | 'facebook'
      | 'threads'
      | 'googlebusiness';

    /**
     * For publish-now timeout fallback, true means the platform target was accepted
     * and final status is still pending.
     */
    success: boolean;

    /**
     * Error message when success is false
     */
    error?: string;

    /**
     * Direct URL to the published post
     */
    platformPostUrl?: string;

    /**
     * Warning message when the post published but a non-critical follow-up action
     * failed
     */
    warningMessage?: string;
  }
}

export interface PostRetrieveResponse {
  post: PostRetrieveResponse.Post;

  success: boolean;
}

export namespace PostRetrieveResponse {
  export interface Post {
    content: string;

    createdAt: string;

    crosspostingEnabled: boolean;

    mediaItems: Array<Post.MediaItem>;

    platforms: Array<Post.Platform>;

    /**
     * MongoDB ObjectId of the Post document
     */
    postId: string;

    rawRequestBody: { [key: string]: unknown };

    /**
     * ISO 8601 scheduled datetime
     */
    scheduledFor: string | null;

    status: 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial';

    timezone: string;

    updatedAt: string;
  }

  export namespace Post {
    export interface MediaItem {
      filename: string;

      mimeType: string;

      size: number;

      type: 'image' | 'video' | 'gif';

      url: string;
    }

    export interface Platform {
      /**
       * Per-platform text override that was used for this platform. Null when the
       * top-level `content` was used.
       */
      content: string | null;

      errorMessage: string | null;

      platform:
        | 'twitter'
        | 'instagram'
        | 'youtube'
        | 'tiktok'
        | 'pinterest'
        | 'linkedin'
        | 'bluesky'
        | 'facebook'
        | 'threads'
        | 'googlebusiness';

      platformPostId: string | null;

      /**
       * Direct URL to the published post
       */
      platformPostUrl: string | null;

      publishedAt: string | null;

      status: 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial';

      warningMessage: string | null;
    }
  }
}

export interface PostListResponse {
  posts: Array<PostListResponse.Post>;

  success: boolean;

  /**
   * Total matched posts across all pages
   */
  total: number;
}

export namespace PostListResponse {
  export interface Post {
    content: string;

    createdAt: string;

    crosspostingEnabled: boolean;

    mediaItems: Array<Post.MediaItem>;

    platforms: Array<Post.Platform>;

    /**
     * MongoDB ObjectId of the Post document
     */
    postId: string;

    rawRequestBody: { [key: string]: unknown };

    /**
     * ISO 8601 scheduled datetime
     */
    scheduledFor: string | null;

    status: 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial';

    timezone: string;

    updatedAt: string;
  }

  export namespace Post {
    export interface MediaItem {
      filename: string;

      mimeType: string;

      size: number;

      type: 'image' | 'video' | 'gif';

      url: string;
    }

    export interface Platform {
      /**
       * Per-platform text override that was used for this platform. Null when the
       * top-level `content` was used.
       */
      content: string | null;

      errorMessage: string | null;

      platform:
        | 'twitter'
        | 'instagram'
        | 'youtube'
        | 'tiktok'
        | 'pinterest'
        | 'linkedin'
        | 'bluesky'
        | 'facebook'
        | 'threads'
        | 'googlebusiness';

      platformPostId: string | null;

      /**
       * Direct URL to the published post
       */
      platformPostUrl: string | null;

      publishedAt: string | null;

      status: 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial';

      warningMessage: string | null;
    }
  }
}

export interface PostDeleteResponse {
  success: boolean;

  creditsCharged?: number;

  platforms?: Array<PostDeleteResponse.Platform>;
}

export namespace PostDeleteResponse {
  export interface Platform {
    integrationId: string;

    platform: string;

    platformPostId: string | null;

    status: string;

    success: boolean;

    errorMessage?: string;

    message?: string;
  }
}

export interface PostCreateParams {
  /**
   * Post text body
   */
  content: string;

  /**
   * Target platform accounts to publish to
   */
  platforms: Array<PostCreateParams.Platform>;

  /**
   * Media attachments (images, videos, GIFs)
   */
  mediaItems?: Array<PostCreateParams.MediaItem>;

  /**
   * Publish immediately. Required when scheduledFor is omitted.
   */
  publishNow?: boolean;

  /**
   * ISO 8601 datetime to schedule the post for future publishing
   */
  scheduledFor?: string;

  /**
   * IANA timezone for the scheduled time (e.g. America/New_York). Defaults to UTC.
   */
  timezone?: string;
}

export namespace PostCreateParams {
  export interface Platform {
    /**
     * Integration.\_id — find yours via GET /connect/integrations
     */
    accountId: string;

    platform:
      | 'twitter'
      | 'instagram'
      | 'youtube'
      | 'tiktok'
      | 'pinterest'
      | 'linkedin'
      | 'bluesky'
      | 'facebook'
      | 'threads'
      | 'googlebusiness';

    /**
     * Optional per-platform text override. Use when you want to change the text for
     * this platform because different platforms talk differently. When omitted, the
     * top-level `content` is used.
     */
    content?: string;

    /**
     * Platform-specific options. See TwitterConfigurations, YouTubeConfigurations,
     * TikTokConfigurations, PinterestConfigurations, LinkedInConfigurations, or
     * GoogleBusinessConfigurations in the schema reference for available fields per
     * platform.
     */
    platformSpecificData?: { [key: string]: unknown };
  }

  export interface MediaItem {
    type: 'image' | 'video' | 'gif' | 'document';

    url: string;

    /**
     * Thumbnail image URL for video items. Supported on YouTube regular videos (not
     * Shorts). JPEG, PNG, or GIF, max 2 MB, min 640 px wide.
     */
    thumbnail?: string;
  }
}

export interface PostListParams {
  /**
   * ISO 8601 lower bound on createdAt
   */
  createdAfter?: string;

  /**
   * ISO 8601 upper bound on createdAt
   */
  createdBefore?: string;

  /**
   * Page size (max 100)
   */
  limit?: number;

  /**
   * Number of posts to skip
   */
  offset?: number;

  /**
   * Filter by platform (repeatable — OR logic)
   */
  platform?: Array<
    | 'twitter'
    | 'instagram'
    | 'youtube'
    | 'tiktok'
    | 'pinterest'
    | 'linkedin'
    | 'bluesky'
    | 'facebook'
    | 'threads'
    | 'googlebusiness'
  >;

  /**
   * Filter to posts targeting an integration bound to this profile. Pass "null"
   * (literal string) to filter to posts whose integrations have no profile.
   */
  profileId?: string;

  /**
   * ISO 8601 lower bound on scheduledFor
   */
  scheduledAfter?: string;

  /**
   * ISO 8601 upper bound on scheduledFor
   */
  scheduledBefore?: string;

  sort?: 'asc' | 'desc';

  status?: 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial';
}

export interface PostDeleteParams {
  /**
   * When true, also delete supported published platform posts. Costs 1 credit per
   * successful platform deletion.
   */
  deleteFromPlatforms?: boolean;
}

Posts.Scheduled = Scheduled;

export declare namespace Posts {
  export {
    type Status as Status,
    type PostCreateResponse as PostCreateResponse,
    type PostRetrieveResponse as PostRetrieveResponse,
    type PostListResponse as PostListResponse,
    type PostDeleteResponse as PostDeleteResponse,
    type PostCreateParams as PostCreateParams,
    type PostListParams as PostListParams,
    type PostDeleteParams as PostDeleteParams,
  };

  export {
    Scheduled as Scheduled,
    type ScheduledListResponse as ScheduledListResponse,
    type ScheduledCancelResponse as ScheduledCancelResponse,
    type ScheduledRescheduleResponse as ScheduledRescheduleResponse,
    type ScheduledListParams as ScheduledListParams,
    type ScheduledRescheduleParams as ScheduledRescheduleParams,
  };
}
