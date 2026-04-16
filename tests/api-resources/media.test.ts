// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Postpeer from '@postpeer/typescript';

const client = new Postpeer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource media', () => {
  // Mock server tests are disabled
  test.skip('upload: only required params', async () => {
    const responsePromise = client.media.upload({ filename: 'x', mimeType: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('upload: required and optional params', async () => {
    const response = await client.media.upload({ filename: 'x', mimeType: 'x' });
  });
});
