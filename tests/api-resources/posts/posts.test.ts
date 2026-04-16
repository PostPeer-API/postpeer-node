// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PostPeer from '@postpeer/typescript';

const client = new PostPeer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource posts', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.posts.create({
      content: 'Hello world!',
      platforms: [{ accountId: '<your-account-id>', platform: 'twitter' }],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.posts.create({
      content: 'Hello world!',
      platforms: [
        {
          accountId: '<your-account-id>',
          platform: 'twitter',
          platformSpecificData: {
            communityId: 'communityId',
            poll: { duration_minutes: 5, options: ['string', 'string'] },
            replySettings: 'following',
            replyToTweetId: 'replyToTweetId',
            shareWithFollowers: true,
            threadItems: [
              { content: 'content', mediaItems: [{ type: 'image', url: 'https://example.com' }] },
            ],
          },
        },
      ],
      mediaItems: [
        {
          type: 'image',
          url: 'https://example.com',
          thumbnail: 'https://example.com',
        },
      ],
      publishNow: true,
      scheduledFor: '2019-12-27T18:11:19.117Z',
      timezone: 'timezone',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.posts.retrieve('postId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.posts.list();
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
      client.posts.list(
        {
          createdAfter: '2019-12-27T18:11:19.117Z',
          createdBefore: '2019-12-27T18:11:19.117Z',
          limit: 1,
          offset: 0,
          platform: ['twitter'],
          scheduledAfter: '2019-12-27T18:11:19.117Z',
          scheduledBefore: '2019-12-27T18:11:19.117Z',
          sort: 'asc',
          status: 'draft',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(PostPeer.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.posts.delete('postId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
