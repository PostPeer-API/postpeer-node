// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Postpeer } from '../client';

export abstract class APIResource {
  protected _client: Postpeer;

  constructor(client: Postpeer) {
    this._client = client;
  }
}
