// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Integrations extends APIResource {
  /**
   * List integrations connected to this project
   */
  list(
    query: IntegrationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<IntegrationListResponse> {
    return this._client.get('/v1/connect/integrations', { query, ...options });
  }

  /**
   * Disconnect a platform integration
   */
  disconnect(id: string, options?: RequestOptions): APIPromise<IntegrationDisconnectResponse> {
    return this._client.delete(path`/v1/connect/integrations/${id}`, options);
  }
}

export interface IntegrationListResponse {
  integrations: Array<IntegrationListResponse.Integration>;

  success: boolean;

  /**
   * Total matched integrations across all pages
   */
  total: number;
}

export namespace IntegrationListResponse {
  export interface Integration {
    /**
     * Use this as accountId when creating posts
     */
    id: string;

    /**
     * The OAuth app metadata for BYOK integrations, or null when postpeer system app
     * was used.
     */
    app: Integration.App | null;

    /**
     * The OAuth app (customer's own OAuth app) this integration was connected under,
     * or null if postpeer's system app was used.
     */
    appId: string | null;

    /**
     * True when this integration was connected under the customer's own OAuth app
     * (Bring Your Own Keys), i.e. appId is set. False when postpeer's system app is
     * used.
     */
    byok: boolean;

    createdAt: string;

    /**
     * Human-readable display name of the connected account
     */
    displayName: string | null;

    /**
     * Profile image URL for the connected account, or null if unavailable
     */
    imageUrl: string | null;

    platform:
      | 'twitter'
      | 'instagram'
      | 'youtube'
      | 'tiktok'
      | 'pinterest'
      | 'linkedin'
      | 'bluesky'
      | 'facebook'
      | 'threads';

    /**
     * The user ID on the platform, or null if not yet retrieved
     */
    platformUserId: string | null;

    /**
     * Profile this integration belongs to, or null if it was connected without a
     * profile
     */
    profileId: string | null;

    /**
     * Public profile/page URL for the connected account, when it can be derived
     */
    profileUrl: string | null;

    /**
     * The public username or handle, including @ for handle-based platforms
     */
    username: string | null;

    /**
     * Provider-specific public metadata for this connected account.
     */
    platformMetadata?: { [key: string]: unknown };
  }

  export namespace Integration {
    /**
     * The OAuth app metadata for BYOK integrations, or null when postpeer system app
     * was used.
     */
    export interface App {
      id?: string;

      imageUrl?: string | null;

      name?: string;
    }
  }
}

export interface IntegrationDisconnectResponse {
  message: string;

  success: boolean;
}

export interface IntegrationListParams {
  /**
   * Page size (max 100)
   */
  limit?: number;

  /**
   * Number of integrations to skip
   */
  offset?: number;

  platform?:
    | 'twitter'
    | 'instagram'
    | 'youtube'
    | 'tiktok'
    | 'pinterest'
    | 'linkedin'
    | 'bluesky'
    | 'facebook'
    | 'threads';

  /**
   * Filter to integrations belonging to this profile. Pass "null" (literal string)
   * to filter to integrations with no profile.
   */
  profileId?: string;

  /**
   * Case-insensitive search across the connected account name (displayName),
   * username, and platform user ID.
   */
  q?: string;

  sort?: 'asc' | 'desc';
}

export declare namespace Integrations {
  export {
    type IntegrationListResponse as IntegrationListResponse,
    type IntegrationDisconnectResponse as IntegrationDisconnectResponse,
    type IntegrationListParams as IntegrationListParams,
  };
}
