// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Media extends APIResource {
  /**
   * Get a presigned S3 URL to upload a media file
   */
  upload(body: MediaUploadParams, options?: RequestOptions): APIPromise<MediaUploadResponse> {
    return this._client.post('/v1/media/upload', { body, ...options });
  }
}

export interface MediaUploadResponse {
  data: MediaUploadResponse.Data;

  success: boolean;
}

export namespace MediaUploadResponse {
  export interface Data {
    publicUrl: string;

    uploadUrl: string;
  }
}

export interface MediaUploadParams {
  filename: string;

  mimeType: string;
}

export declare namespace Media {
  export {
    type MediaUploadResponse as MediaUploadResponse,
    type MediaUploadParams as MediaUploadParams
  };
}
