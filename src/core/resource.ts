// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { PostPeer } from '../client';

export abstract class APIResource {
  protected _client: PostPeer;

  constructor(client: PostPeer) {
    this._client = client;
  }
}
