// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Platforms extends APIResource {
  /**
   * List available platforms and their status
   */
  list(options?: RequestOptions): APIPromise<PlatformListResponse> {
    return this._client.get('/v1/platforms', options);
  }
}

export interface PlatformListResponse {
  platforms: Array<PlatformListResponse.Platform>;
}

export namespace PlatformListResponse {
  export interface Platform {
    name:
      | 'twitter'
      | 'instagram'
      | 'youtube'
      | 'tiktok'
      | 'pinterest'
      | 'linkedin'
      | 'bluesky'
      | 'facebook'
      | 'threads';

    status: 'prod' | 'beta' | 'dev';
  }
}

export declare namespace Platforms {
  export { type PlatformListResponse as PlatformListResponse };
}
