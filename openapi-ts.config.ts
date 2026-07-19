import { defineConfig } from '@hey-api/openapi-ts';

const operationPaths: Record<string, string[]> = {
  healthCheck: ['health', 'check'],
  healthCheckAuth: ['health', 'verifyAccessKey'],
  getLinkedInSelection: ['connect', 'linkedin', 'getSelection'],
  submitLinkedInSelection: ['connect', 'linkedin', 'submitSelection'],
  getOAuthUrl: ['connect', 'getOAuthUrl'],
  connectBluesky: ['connect', 'bluesky'],
  listIntegrations: ['connect', 'integrations', 'list'],
  disconnectIntegration: ['connect', 'integrations', 'disconnect'],
  createProfile: ['profiles', 'create'],
  listProfiles: ['profiles', 'list'],
  getProfile: ['profiles', 'get'],
  updateProfile: ['profiles', 'update'],
  deleteProfile: ['profiles', 'delete'],
  createApp: ['apps', 'create'],
  listApps: ['apps', 'list'],
  getApp: ['apps', 'get'],
  updateApp: ['apps', 'update'],
  deleteApp: ['apps', 'delete'],
  testNotification: ['notifications', 'test'],
  createNotification: ['notifications', 'create'],
  listNotifications: ['notifications', 'list'],
  getNotification: ['notifications', 'get'],
  updateNotification: ['notifications', 'update'],
  deleteNotification: ['notifications', 'delete'],
  listPlatforms: ['platforms', 'list'],
  createPost: ['posts', 'create'],
  listPosts: ['posts', 'list'],
  getPost: ['posts', 'get'],
  deletePost: ['posts', 'delete'],
  listScheduledPosts: ['posts', 'scheduled', 'list'],
  cancelScheduledPost: ['posts', 'scheduled', 'cancel'],
  reschedulePost: ['posts', 'scheduled', 'reschedule'],
  createMediaUpload: ['media', 'upload'],
  getAnalytics: ['analytics', 'get'],
  getUsage: ['usage', 'get'],
  getPinterestBoards: ['pinterest', 'getBoards'],
  getTikTokCreatorInfo: ['tiktok', 'getCreatorInfo'],
  aiWriteContent: ['ai', 'write'],
  aiGenerateImage: ['ai', 'generateImage'],
};

export default defineConfig({
  input: './openapi.json',
  output: {
    path: './src/generated',
  },
  plugins: [
    {
      name: '@hey-api/client-fetch',
    },
    {
      name: '@hey-api/sdk',
      auth: true,
      paramsStructure: 'grouped',
      operations: {
        containerName: 'PostPeerApi',
        nesting(operation) {
          return operationPaths[operation.operationId ?? ''] ?? [operation.operationId ?? 'request'];
        },
        strategy: 'single',
      },
    },
  ],
});
