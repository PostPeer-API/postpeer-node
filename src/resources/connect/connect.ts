// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as IntegrationsAPI from './integrations';
import { IntegrationDisconnectResponse, IntegrationListResponse, Integrations } from './integrations';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Connect extends APIResource {
  integrations: IntegrationsAPI.Integrations = new IntegrationsAPI.Integrations(this._client);

  /**
   * Get OAuth URL for a platform
   */
  getOAuthURL(platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest' | 'linkedin' | 'bluesky', query: ConnectGetOAuthURLParams | null | undefined = {}, options?: RequestOptions): APIPromise<ConnectGetOAuthURLResponse> {
    return this._client.get(path`/v1/connect/${platform}`, { query, ...options });
  }
}

export interface ConnectGetOAuthURLResponse {
  url: string;
}

export interface ConnectGetOAuthURLParams {
  /**
   * URL to redirect to after a successful connection
   */
  redirectUri?: string;
}

Connect.Integrations = Integrations;

export declare namespace Connect {
  export {
    type ConnectGetOAuthURLResponse as ConnectGetOAuthURLResponse,
    type ConnectGetOAuthURLParams as ConnectGetOAuthURLParams
  };

  export {
    Integrations as Integrations,
    type IntegrationListResponse as IntegrationListResponse,
    type IntegrationDisconnectResponse as IntegrationDisconnectResponse
  };
}
