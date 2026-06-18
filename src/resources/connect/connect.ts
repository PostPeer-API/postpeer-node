// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as IntegrationsAPI from './integrations';
import {
  IntegrationDisconnectResponse,
  IntegrationListParams,
  IntegrationListResponse,
  Integrations,
} from './integrations';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Connect extends APIResource {
  integrations: IntegrationsAPI.Integrations = new IntegrationsAPI.Integrations(this._client);

  /**
   * Initiates an OAuth connection flow. By default, PostPeer hosts any required
   * account selection UI and then returns the user to redirectUri. For LinkedIn
   * custom account-selection UI, pass headless=true; if selection is required, the
   * callback redirects to redirectUri with status=selection_required,
   * platform=linkedin, and selectionToken.
   */
  getOAuthURL(
    platform:
      | 'twitter'
      | 'instagram'
      | 'youtube'
      | 'tiktok'
      | 'pinterest'
      | 'linkedin'
      | 'bluesky'
      | 'facebook'
      | 'threads',
    query: ConnectGetOAuthURLParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConnectGetOAuthURLResponse> {
    return this._client.get(path`/v1/connect/${platform}`, { query, ...options });
  }
}

export interface ConnectGetOAuthURLResponse {
  url: string;
}

export interface ConnectGetOAuthURLParams {
  /**
   * Connect under your own OAuth app (Bring Your Own Keys). Pass the id of an OAuth
   * app created via /v1/apps for this same platform. Omit to use postpeer's system
   * app.
   */
  appId?: string;

  /**
   * When true, platforms that require account selection redirect back to redirectUri
   * with a short-lived selectionToken so you can build your own selection UI. When
   * false, PostPeer hosts the selection UI.
   */
  headless?: boolean;

  /**
   * Profile to associate the resulting integration with. Must belong to the same
   * project. Omit to connect without a profile.
   */
  profileId?: string;

  /**
   * Final URL to redirect to after the connection completes. In headless mode, this
   * URL also receives selection status query parameters when customer-owned account
   * selection is required.
   */
  redirectUri?: string;
}

Connect.Integrations = Integrations;

export declare namespace Connect {
  export {
    type ConnectGetOAuthURLResponse as ConnectGetOAuthURLResponse,
    type ConnectGetOAuthURLParams as ConnectGetOAuthURLParams,
  };

  export {
    Integrations as Integrations,
    type IntegrationListResponse as IntegrationListResponse,
    type IntegrationDisconnectResponse as IntegrationDisconnectResponse,
    type IntegrationListParams as IntegrationListParams,
  };
}
