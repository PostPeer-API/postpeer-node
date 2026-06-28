// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Scheduled extends APIResource {
  /**
   * Returns a paginated list of scheduled posts. Use `limit` + `offset` to page
   * through the results.
   *
   * @example
   * ```ts
   * const scheduleds = await client.posts.scheduled.list();
   * ```
   */
  list(
    query: ScheduledListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ScheduledListResponse> {
    return this._client.get('/v1/posts/scheduled/', { query, ...options });
  }

  /**
   * Cancel a scheduled post (moves it back to draft)
   *
   * @example
   * ```ts
   * const response = await client.posts.scheduled.cancel(
   *   'postId',
   * );
   * ```
   */
  cancel(postID: string, options?: RequestOptions): APIPromise<ScheduledCancelResponse> {
    return this._client.delete(path`/v1/posts/scheduled/${postID}`, options);
  }

  /**
   * Reschedule a post to a new time
   *
   * @example
   * ```ts
   * const response = await client.posts.scheduled.reschedule(
   *   'postId',
   *   { scheduledFor: '2019-12-27T18:11:19.117Z' },
   * );
   * ```
   */
  reschedule(
    postID: string,
    body: ScheduledRescheduleParams,
    options?: RequestOptions,
  ): APIPromise<ScheduledRescheduleResponse> {
    return this._client.patch(path`/v1/posts/scheduled/${postID}`, { body, ...options });
  }
}

export interface ScheduledListResponse {
  posts: Array<ScheduledListResponse.Post>;

  success: boolean;

  /**
   * Total matched scheduled posts across all pages
   */
  total: number;
}

export namespace ScheduledListResponse {
  export interface Post {
    /**
     * Post text body
     */
    content: string;

    createdAt: string;

    platforms: Array<Post.Platform>;

    /**
     * MongoDB ObjectId of the Post document
     */
    postId: string;

    /**
     * ISO 8601 scheduled datetime
     */
    scheduledFor: string | null;

    /**
     * IANA timezone for the scheduled time
     */
    timezone: string;

    /**
     * Media attachments
     */
    mediaItems?: Array<Post.MediaItem>;
  }

  export namespace Post {
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

      status: 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial';
    }

    export interface MediaItem {
      type: 'image' | 'video' | 'gif';

      url: string;

      /**
       * Thumbnail image URL for video items. Supported on YouTube regular videos (not
       * Shorts). JPEG, PNG, or GIF, max 2 MB, min 640 px wide.
       */
      thumbnail?: string;
    }
  }
}

export interface ScheduledCancelResponse {
  message: string;

  success: boolean;
}

export interface ScheduledRescheduleResponse {
  message: string;

  scheduledFor: string;

  success: boolean;
}

export interface ScheduledListParams {
  /**
   * Page size (max 100)
   */
  limit?: number;

  /**
   * Number of scheduled posts to skip
   */
  offset?: number;

  sort?: 'asc' | 'desc';
}

export interface ScheduledRescheduleParams {
  /**
   * New ISO 8601 datetime to schedule the post
   */
  scheduledFor: string;

  /**
   * IANA timezone
   */
  timezone?: string;
}

export declare namespace Scheduled {
  export {
    type ScheduledListResponse as ScheduledListResponse,
    type ScheduledCancelResponse as ScheduledCancelResponse,
    type ScheduledRescheduleResponse as ScheduledRescheduleResponse,
    type ScheduledListParams as ScheduledListParams,
    type ScheduledRescheduleParams as ScheduledRescheduleParams,
  };
}
