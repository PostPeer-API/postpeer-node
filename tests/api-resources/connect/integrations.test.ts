// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Postpeer from '@postpeer/node';

const client = new Postpeer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource integrations', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.connect.integrations.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.connect.integrations.list(
        {
          limit: 1,
          page: 1,
          platform: 'twitter',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Postpeer.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('disconnect', async () => {
    const responsePromise = client.connect.integrations.disconnect('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
