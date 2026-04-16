// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as PostsAPI from './posts';
import * as ScheduledAPI from './scheduled';
import {
  Scheduled,
  ScheduledCancelResponse,
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
  delete(postID: string, options?: RequestOptions): APIPromise<PostDeleteResponse> {
    return this._client.delete(path`/v1/posts/${postID}`, options);
  }
}

export interface PostSummary {
  content: string;

  createdAt: string;

  crosspostingEnabled: boolean;

  mediaItems: Array<PostSummary.MediaItem>;

  platforms: Array<PostSummary.Platform>;

  /**
   * MongoDB ObjectId of the Post document
   */
  postId: string;

  rawRequestBody: { [key: string]: unknown };

  /**
   * ISO 8601 scheduled datetime
   */
  scheduledFor: string | null;

  status: Status;

  timezone: string;

  updatedAt: string;
}

export namespace PostSummary {
  export interface MediaItem {
    filename: string;

    mimeType: string;

    size: number;

    type: 'image' | 'video' | 'gif';

    url: string;
  }

  export interface Platform {
    errorMessage: string | null;

    platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin';

    platformPostId: string | null;

    /**
     * Direct URL to the published post
     */
    platformPostUrl: string | null;

    publishedAt: string | null;

    status: PostsAPI.Status;
  }
}

export type Status = 'draft' | 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'partial';

export interface PostCreateResponse {
  platforms: Array<PostCreateResponse.Platform>;

  /**
   * id of the saved Post document
   */
  postId: string;

  status: Status;

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
    platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin';

    success: boolean;

    /**
     * Error message when success is false
     */
    error?: string;

    /**
     * Direct URL to the published post
     */
    platformPostUrl?: string;
  }
}

export interface PostRetrieveResponse {
  post: PostSummary;

  success: boolean;
}

export interface PostListResponse {
  posts: Array<PostSummary>;

  success: boolean;

  /**
   * Total matched posts across all pages
   */
  total: number;
}

export interface PostDeleteResponse {
  success: boolean;
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

    platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin';

    /**
     * Platform-specific options. See TwitterConfigurations, YouTubeConfigurations,
     * TikTokConfigurations, PinterestConfigurations, or LinkedInConfigurations
     * depending on the target platform.
     */
    platformSpecificData?:
      | Platform.TwitterConfigurations
      | Platform.YouTubeConfigurations
      | Platform.TikTokConfigurations
      | Platform.PinterestConfigurations
      | Platform.LinkedInConfigurations;
  }

  export namespace Platform {
    /**
     * Pass this object in platformSpecificData when posting to Twitter/X, including
     * Community post options.
     */
    export interface TwitterConfigurations {
      /**
       * Community ID to publish this post into.
       */
      communityId?: string;

      /**
       * Cannot be combined with media or threadItems.
       */
      poll?: TwitterConfigurations.Poll;

      /**
       * Who can reply to this tweet.
       */
      replySettings?: 'following' | 'mentionedUsers' | 'subscribers' | 'verified';

      /**
       * Tweet ID to reply to.
       */
      replyToTweetId?: string;

      /**
       * When posting to a Community, also share the post with followers.
       */
      shareWithFollowers?: boolean;

      /**
       * Additional tweets to chain as a thread. The root tweet uses post.content.
       */
      threadItems?: Array<TwitterConfigurations.ThreadItem>;
    }

    export namespace TwitterConfigurations {
      /**
       * Cannot be combined with media or threadItems.
       */
      export interface Poll {
        /**
         * Poll duration in minutes (5 min – 7 days).
         */
        duration_minutes: number;

        /**
         * 2–4 poll options.
         */
        options: Array<string>;
      }

      export interface ThreadItem {
        /**
         * Text of this thread tweet (max 280 chars)
         */
        content: string;

        mediaItems?: Array<ThreadItem.MediaItem>;
      }

      export namespace ThreadItem {
        export interface MediaItem {
          type: 'image' | 'video' | 'gif';

          url: string;
        }
      }
    }

    /**
     * Pass this object in platformSpecificData when posting to YouTube.
     */
    export interface YouTubeConfigurations {
      /**
       * YouTube category ID. Defaults to "22" (People & Blogs). Common values: "1" Film
       * & Animation, "10" Music, "20" Gaming, "22" People & Blogs, "27" Education, "28"
       * Science & Technology.
       */
      categoryId?: string;

      /**
       * AI-generated content disclosure. YouTube is increasingly enforcing this
       * requirement. Defaults to false.
       */
      containsSyntheticMedia?: boolean;

      /**
       * Auto-posted comment after the video goes live. Max 10,000 characters. For
       * publishNow posts: posted immediately after upload. For scheduled posts: posted
       * when the video becomes public.
       */
      firstComment?: string;

      /**
       * COPPA compliance flag. Setting to true permanently disables comments,
       * notification bell, personalized ads, end screens, and cards on the video.
       * Defaults to false.
       */
      madeForKids?: boolean;

      /**
       * Video tags. Total characters across all tags must be ≤500.
       */
      tags?: Array<string>;

      /**
       * Video title (max 100 chars, no < or >). Defaults to first 100 chars of content,
       * or "Untitled Video".
       */
      title?: string;

      /**
       * Who can see the video. Defaults to "public". Scheduled posts upload as private
       * and flip to this value at publish time.
       */
      visibility?: 'public' | 'private' | 'unlisted';
    }

    /**
     * Pass this object in platformSpecificData when posting to TikTok.
     */
    export interface TikTokConfigurations {
      /**
       * Automatically add background music to photo carousels. Photo posts only.
       * Defaults to true.
       */
      auto_add_music?: boolean;

      /**
       * Mark as branded content (paid partnership). Defaults to false.
       */
      brand_content_toggle?: boolean;

      /**
       * Mark as organic brand promotion. Defaults to false.
       */
      brand_organic_toggle?: boolean;

      /**
       * Disable comments on this post. Defaults to false.
       */
      disable_comment?: boolean;

      /**
       * Disable duet for this video. Videos only. Defaults to false.
       */
      disable_duet?: boolean;

      /**
       * Disable stitch for this video. Videos only. Defaults to false.
       */
      disable_stitch?: boolean;

      /**
       * When true (default), sends content to the creator's TikTok inbox as a draft. Set
       * to false to publish immediately (requires an audited app).
       */
      draft?: boolean;

      /**
       * AI-generated content disclosure. Defaults to false.
       */
      is_aigc?: boolean;

      /**
       * 0-indexed position of the cover image in a photo carousel. Photo posts only.
       * Defaults to 0.
       */
      photo_cover_index?: number;

      /**
       * Who can see this post. Defaults to "SELF_ONLY" (required for unreviewed apps).
       * Upgrade to PUBLIC_TO_EVERYONE after TikTok app review.
       */
      privacy_level?: 'PUBLIC_TO_EVERYONE' | 'MUTUAL_FOLLOW_FRIENDS' | 'FOLLOWER_OF_CREATOR' | 'SELF_ONLY';

      /**
       * Timestamp in milliseconds to use as the video cover frame. Videos only. Defaults
       * to 1000ms.
       */
      video_cover_timestamp_ms?: number;
    }

    /**
     * Pass this object in platformSpecificData when posting to Pinterest.
     */
    export interface PinterestConfigurations {
      /**
       * Target board ID. Retrieve available boards via GET /connect/pinterest/boards.
       */
      boardId: string;

      /**
       * Accessible image description. Max 500 characters.
       */
      altText?: string;

      /**
       * Custom cover image URL for video pins.
       */
      coverImageUrl?: string;

      /**
       * Hex color for the loading placeholder (e.g. "#6E7874").
       */
      dominantColor?: string;

      /**
       * HTTPS destination URL when the pin is clicked. Important for driving traffic.
       */
      link?: string;

      /**
       * Pin title. Max 100 characters. Defaults to first line of content.
       */
      title?: string;
    }

    /**
     * Pass this object in platformSpecificData when posting to LinkedIn.
     */
    export interface LinkedInConfigurations {
      /**
       * Description for the article preview card. Max 400 characters.
       */
      article_description?: string;

      /**
       * Title for the article preview card. Max 400 characters.
       */
      article_title?: string;

      /**
       * URL for an article/link post. When provided, the post becomes a link share with
       * a preview card.
       */
      article_url?: string;

      /**
       * Post visibility. "PUBLIC" = visible to everyone, "CONNECTIONS" = visible to
       * connections only. Defaults to "PUBLIC".
       */
      visibility?: 'PUBLIC' | 'CONNECTIONS';
    }
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
  platform?: Array<'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin'>;

  /**
   * ISO 8601 lower bound on scheduledFor
   */
  scheduledAfter?: string;

  /**
   * ISO 8601 upper bound on scheduledFor
   */
  scheduledBefore?: string;

  /**
   * Sort direction by createdAt
   */
  sort?: 'asc' | 'desc';

  status?: Status;
}

Posts.Scheduled = Scheduled;

export declare namespace Posts {
  export {
    type PostSummary as PostSummary,
    type Status as Status,
    type PostCreateResponse as PostCreateResponse,
    type PostRetrieveResponse as PostRetrieveResponse,
    type PostListResponse as PostListResponse,
    type PostDeleteResponse as PostDeleteResponse,
    type PostCreateParams as PostCreateParams,
    type PostListParams as PostListParams,
  };

  export {
    Scheduled as Scheduled,
    type ScheduledListResponse as ScheduledListResponse,
    type ScheduledCancelResponse as ScheduledCancelResponse,
    type ScheduledRescheduleResponse as ScheduledRescheduleResponse,
    type ScheduledRescheduleParams as ScheduledRescheduleParams,
  };
}
