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
  platforms: Array<
    | PostCreateParams.UnionMember0
    | PostCreateParams.UnionMember1
    | PostCreateParams.UnionMember2
    | PostCreateParams.UnionMember3
    | PostCreateParams.UnionMember4
    | PostCreateParams.UnionMember5
    | PostCreateParams.UnionMember6
    | PostCreateParams.UnionMember7
    | PostCreateParams.UnionMember8
    | PostCreateParams.UnionMember9
  >;

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
  export interface UnionMember0 {
    /**
     * Integration.\_id — find yours via GET /connect/integrations
     */
    accountId: string;

    platform: 'twitter';

    /**
     * Optional per-platform text override. Use when you want to change the text for
     * this platform because different platforms talk differently. When omitted, the
     * top-level `content` is used.
     */
    content?: string;

    /**
     * Pass this object in platformSpecificData when posting to Twitter/X, including
     * Community post options.
     */
    platformSpecificData?: UnionMember0.PlatformSpecificData;
  }

  export namespace UnionMember0 {
    /**
     * Pass this object in platformSpecificData when posting to Twitter/X, including
     * Community post options.
     */
    export interface PlatformSpecificData {
      /**
       * Community ID to publish this post into.
       */
      communityId?: string;

      /**
       * Cannot be combined with media or threadItems.
       */
      poll?: PlatformSpecificData.Poll;

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
      threadItems?: Array<PlatformSpecificData.ThreadItem>;
    }

    export namespace PlatformSpecificData {
      /**
       * Cannot be combined with media or threadItems.
       */
      export interface Poll {
        /**
         * Poll duration in minutes (5 min – 7 days).
         */
        durationMinutes: number;

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
          type: 'image' | 'video' | 'gif' | 'document';

          url: string;

          /**
           * Thumbnail image URL for video items. Supported on YouTube regular videos (not
           * Shorts). JPEG, PNG, or GIF, max 2 MB, min 640 px wide.
           */
          thumbnail?: string;
        }
      }
    }
  }

  export interface UnionMember1 {
    /**
     * Integration.\_id — find yours via GET /connect/integrations
     */
    accountId: string;

    platform: 'instagram';

    /**
     * Optional per-platform text override. Use when you want to change the text for
     * this platform because different platforms talk differently. When omitted, the
     * top-level `content` is used.
     */
    content?: string;

    /**
     * Pass this object in platformSpecificData when posting to Instagram Business
     * accounts. All fields are optional and apply to Reels/video posts; image posts
     * ignore them.
     */
    platformSpecificData?: UnionMember1.PlatformSpecificData;
  }

  export namespace UnionMember1 {
    /**
     * Pass this object in platformSpecificData when posting to Instagram Business
     * accounts. All fields are optional and apply to Reels/video posts; image posts
     * ignore them.
     */
    export interface PlatformSpecificData {
      /**
       * Video-only. Public URL of an image Instagram will use as the cover frame for the
       * Reel/video post. Ignored for image posts.
       */
      coverUrl?: string;

      /**
       * Reels-only. When true (default), the Reel also appears in the account's main
       * feed grid. Set false to publish to Reels only.
       */
      shareToFeed?: boolean;

      /**
       * Video-only. Timestamp in milliseconds Instagram extracts as the cover frame.
       * Ignored when coverUrl is set or for image posts.
       */
      thumbOffset?: number;
    }
  }

  export interface UnionMember2 {
    /**
     * Integration.\_id — find yours via GET /connect/integrations
     */
    accountId: string;

    platform: 'youtube';

    /**
     * Optional per-platform text override. Use when you want to change the text for
     * this platform because different platforms talk differently. When omitted, the
     * top-level `content` is used.
     */
    content?: string;

    /**
     * Pass this object in platformSpecificData when posting to YouTube.
     */
    platformSpecificData?: UnionMember2.PlatformSpecificData;
  }

  export namespace UnionMember2 {
    /**
     * Pass this object in platformSpecificData when posting to YouTube.
     */
    export interface PlatformSpecificData {
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
  }

  export interface UnionMember3 {
    /**
     * Integration.\_id — find yours via GET /connect/integrations
     */
    accountId: string;

    platform: 'tiktok';

    /**
     * Optional per-platform text override. Use when you want to change the text for
     * this platform because different platforms talk differently. When omitted, the
     * top-level `content` is used.
     */
    content?: string;

    /**
     * Pass this object in platformSpecificData when posting to TikTok.
     */
    platformSpecificData?: UnionMember3.PlatformSpecificData;
  }

  export namespace UnionMember3 {
    /**
     * Pass this object in platformSpecificData when posting to TikTok.
     */
    export interface PlatformSpecificData {
      /**
       * Automatically add background music to photo carousels. Photo posts only.
       * Defaults to true.
       */
      autoAddMusic?: boolean;

      /**
       * Mark as branded content (paid partnership). Defaults to false.
       */
      brandContentToggle?: boolean;

      /**
       * Mark as organic brand promotion. Defaults to false.
       */
      brandOrganicToggle?: boolean;

      /**
       * Disable comments on this post. Defaults to false.
       */
      disableComment?: boolean;

      /**
       * Disable duet for this video. Videos only. Defaults to false.
       */
      disableDuet?: boolean;

      /**
       * Disable stitch for this video. Videos only. Defaults to false.
       */
      disableStitch?: boolean;

      /**
       * When true, sends content to the creator's TikTok inbox as a draft. Defaults to
       * false (publishes immediately via DIRECT_POST).
       */
      draft?: boolean;

      /**
       * AI-generated content disclosure. Videos only. Defaults to false.
       */
      isAigc?: boolean;

      /**
       * 0-indexed position of the cover image in a photo carousel. Photo posts only.
       * Defaults to 0.
       */
      photoCoverIndex?: number;

      /**
       * Who can see this post. Defaults to "PUBLIC_TO_EVERYONE".
       */
      privacyLevel?: 'PUBLIC_TO_EVERYONE' | 'MUTUAL_FOLLOW_FRIENDS' | 'FOLLOWER_OF_CREATOR' | 'SELF_ONLY';

      /**
       * Timestamp in milliseconds to use as the video cover frame. Videos only.
       */
      videoCoverTimestampMs?: number;
    }
  }

  export interface UnionMember4 {
    /**
     * Integration.\_id — find yours via GET /connect/integrations
     */
    accountId: string;

    platform: 'pinterest';

    /**
     * Optional per-platform text override. Use when you want to change the text for
     * this platform because different platforms talk differently. When omitted, the
     * top-level `content` is used.
     */
    content?: string;

    /**
     * Pass this object in platformSpecificData when posting to Pinterest.
     */
    platformSpecificData?: UnionMember4.PlatformSpecificData;
  }

  export namespace UnionMember4 {
    /**
     * Pass this object in platformSpecificData when posting to Pinterest.
     */
    export interface PlatformSpecificData {
      /**
       * Target board ID. Retrieve available boards via GET /v1/pinterest/boards.
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
  }

  export interface UnionMember5 {
    /**
     * Integration.\_id — find yours via GET /connect/integrations
     */
    accountId: string;

    platform: 'linkedin';

    /**
     * Optional per-platform text override. Use when you want to change the text for
     * this platform because different platforms talk differently. When omitted, the
     * top-level `content` is used.
     */
    content?: string;

    /**
     * Pass this object in platformSpecificData when posting to LinkedIn.
     */
    platformSpecificData?: UnionMember5.PlatformSpecificData;
  }

  export namespace UnionMember5 {
    /**
     * Pass this object in platformSpecificData when posting to LinkedIn.
     */
    export interface PlatformSpecificData {
      /**
       * Description for the article preview card. Max 400 characters.
       */
      articleDescription?: string;

      /**
       * Title for the article preview card. Max 400 characters.
       */
      articleTitle?: string;

      /**
       * URL for an article/link post. When provided, the post becomes a link share with
       * a preview card.
       */
      articleUrl?: string;

      /**
       * Title shown on the document card when posting a PDF. Required by LinkedIn when a
       * document media item is included.
       */
      documentTitle?: string;

      /**
       * Post visibility. "PUBLIC" = visible to everyone, "CONNECTIONS" = visible to
       * connections only. Defaults to "PUBLIC".
       */
      visibility?: 'PUBLIC' | 'CONNECTIONS';
    }
  }

  export interface UnionMember6 {
    /**
     * Integration.\_id — find yours via GET /connect/integrations
     */
    accountId: string;

    platform: 'bluesky';

    /**
     * Optional per-platform text override. Use when you want to change the text for
     * this platform because different platforms talk differently. When omitted, the
     * top-level `content` is used.
     */
    content?: string;

    /**
     * Pass this object in platformSpecificData when posting to Bluesky.
     */
    platformSpecificData?: UnionMember6.PlatformSpecificData;
  }

  export namespace UnionMember6 {
    /**
     * Pass this object in platformSpecificData when posting to Bluesky.
     */
    export interface PlatformSpecificData {
      /**
       * Alt text for each image, in the same order as mediaItems. Strongly encouraged
       * for accessibility.
       */
      altText?: Array<string>;

      /**
       * BCP-47 language tags for the post (e.g. ["en"], ["en-US", "es"]). Defaults to
       * ["en"].
       */
      langs?: Array<string>;
    }
  }

  export interface UnionMember7 {
    /**
     * Integration.\_id — find yours via GET /connect/integrations
     */
    accountId: string;

    platform: 'facebook';

    /**
     * Optional per-platform text override. Use when you want to change the text for
     * this platform because different platforms talk differently. When omitted, the
     * top-level `content` is used.
     */
    content?: string;

    /**
     * Pass this object in platformSpecificData when posting to Facebook Pages.
     */
    platformSpecificData?: UnionMember7.PlatformSpecificData;
  }

  export namespace UnionMember7 {
    /**
     * Pass this object in platformSpecificData when posting to Facebook Pages.
     */
    export interface PlatformSpecificData {
      /**
       * When provided on a text-only post, Facebook renders a link preview card from
       * this URL's Open Graph tags. Ignored when mediaItems are attached.
       */
      link?: string;

      /**
       * When false, the post is created on the Page in unpublished/draft state — useful
       * for staging or scheduling via Facebook's own composer. Defaults to true.
       */
      published?: boolean;

      /**
       * Video posts only. Public URL of an image Facebook will use as the video's
       * cover/thumbnail. Applied as a follow-up call after publish — if the upload
       * fails, the post still succeeds (Facebook just auto-picks a frame). Ignored when
       * no video is attached.
       */
      videoThumbnailUrl?: string;
    }
  }

  export interface UnionMember8 {
    /**
     * Integration.\_id — find yours via GET /connect/integrations
     */
    accountId: string;

    platform: 'threads';

    /**
     * Optional per-platform text override. Use when you want to change the text for
     * this platform because different platforms talk differently. When omitted, the
     * top-level `content` is used.
     */
    content?: string;

    /**
     * Pass this object in platformSpecificData when posting to Threads.
     */
    platformSpecificData?: UnionMember8.PlatformSpecificData;
  }

  export namespace UnionMember8 {
    /**
     * Pass this object in platformSpecificData when posting to Threads.
     */
    export interface PlatformSpecificData {
      /**
       * Alt text for each image, in the same order as mediaItems. Strongly encouraged
       * for accessibility.
       */
      altText?: Array<string>;

      /**
       * Who can reply to this thread. Defaults to "everyone" when omitted.
       */
      replyControl?: 'everyone' | 'accounts_you_follow' | 'mentioned_only';
    }
  }

  export interface UnionMember9 {
    /**
     * Integration.\_id — find yours via GET /connect/integrations
     */
    accountId: string;

    platform: 'googlebusiness';

    /**
     * Optional per-platform text override. Use when you want to change the text for
     * this platform because different platforms talk differently. When omitted, the
     * top-level `content` is used.
     */
    content?: string;

    /**
     * Pass this object in platformSpecificData when posting to Google Business
     * Profile. Posts appear on Google Search and Maps.
     */
    platformSpecificData?: UnionMember9.PlatformSpecificData;
  }

  export namespace UnionMember9 {
    /**
     * Pass this object in platformSpecificData when posting to Google Business
     * Profile. Posts appear on Google Search and Maps.
     */
    export interface PlatformSpecificData {
      /**
       * Call-to-action button shown on the post.
       */
      callToActionType?: 'BOOK' | 'ORDER' | 'SHOP' | 'LEARN_MORE' | 'SIGN_UP' | 'CALL' | 'GET_OFFER';

      /**
       * URL for the call-to-action. Required for all CTA types except CALL.
       */
      callToActionUrl?: string;

      /**
       * Event end date in YYYY-MM-DD format. Required when topicType is EVENT.
       */
      eventEndDate?: string;

      /**
       * Event end time in HH:MM (24-hour) format. Required when topicType is EVENT.
       */
      eventEndTime?: string;

      /**
       * Event start date in YYYY-MM-DD format. Required when topicType is EVENT.
       */
      eventStartDate?: string;

      /**
       * Event start time in HH:MM (24-hour) format. Required when topicType is EVENT.
       */
      eventStartTime?: string;

      /**
       * Event title. Required when topicType is EVENT.
       */
      eventTitle?: string;

      /**
       * Coupon code for OFFER posts.
       */
      offerCouponCode?: string;

      /**
       * Online redemption URL for OFFER posts.
       */
      offerRedeemOnlineUrl?: string;

      /**
       * Terms and conditions text for OFFER posts.
       */
      offerTermsConditions?: string;

      /**
       * Post type. Defaults to STANDARD. Use EVENT for event posts, OFFER for
       * promotional offer posts.
       */
      topicType?: 'STANDARD' | 'EVENT' | 'OFFER';
    }
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
