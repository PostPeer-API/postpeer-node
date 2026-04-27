// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Postpeer from '@postpeer/node';

const client = new Postpeer({ apiKey: 'My API Key', baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010' });

describe('resource scheduled', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.posts.scheduled.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('cancel', async () => {
    const responsePromise = client.posts.scheduled.cancel('postId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('reschedule: only required params', async () => {
    const responsePromise = client.posts.scheduled.reschedule('postId', { scheduledFor: '2019-12-27T18:11:19.117Z' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('reschedule: required and optional params', async () => {
    const response = await client.posts.scheduled.reschedule('postId', { scheduledFor: '2019-12-27T18:11:19.117Z', timezone: 'timezone' });
  });
});
