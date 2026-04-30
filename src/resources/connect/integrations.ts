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

  limit: number;

  page: number;

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

    createdAt: string;

    /**
     * Display name of the connected account (e.g. @handle or channel name)
     */
    displayName: string | null;

    /**
     * Profile image URL for the connected account, or null if unavailable
     */
    imageUrl: string | null;

    platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin' | 'bluesky';

    /**
     * The user ID on the platform, or null if not yet retrieved
     */
    platformUserId: string | null;
  }
}

export interface IntegrationDisconnectResponse {
  message: string;

  success: boolean;
}

export interface IntegrationListParams {
  /**
   * Page size (1-100)
   */
  limit?: number;

  /**
   * Page number
   */
  page?: number;

  platform?: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin' | 'bluesky';
}

export declare namespace Integrations {
  export {
    type IntegrationListResponse as IntegrationListResponse,
    type IntegrationDisconnectResponse as IntegrationDisconnectResponse,
    type IntegrationListParams as IntegrationListParams,
  };
}
