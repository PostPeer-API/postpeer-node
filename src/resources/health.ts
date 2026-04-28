// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Health extends APIResource {
  /**
   * Health check
   */
  check(options?: RequestOptions): APIPromise<HealthCheckResponse> {
    return this._client.get('/v1/health', options);
  }

  /**
   * Verify that the provided access key is valid
   */
  verifyAccessKey(options?: RequestOptions): APIPromise<HealthVerifyAccessKeyResponse> {
    return this._client.get('/v1/health/auth', options);
  }
}

export interface HealthCheckResponse {
  ok: boolean;
}

export interface HealthVerifyAccessKeyResponse {
  ok: boolean;
}

export declare namespace Health {
  export {
    type HealthCheckResponse as HealthCheckResponse,
    type HealthVerifyAccessKeyResponse as HealthVerifyAccessKeyResponse,
  };
}
