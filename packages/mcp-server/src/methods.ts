// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.health.check',
    fullyQualifiedName: 'health.check',
    httpMethod: 'get',
    httpPath: '/v1/health',
  },
  {
    clientCallName: 'client.health.verifyAccessKey',
    fullyQualifiedName: 'health.verifyAccessKey',
    httpMethod: 'get',
    httpPath: '/v1/health/auth',
  },
  {
    clientCallName: 'client.connect.getOAuthURL',
    fullyQualifiedName: 'connect.getOAuthURL',
    httpMethod: 'get',
    httpPath: '/v1/connect/{platform}',
  },
  {
    clientCallName: 'client.connect.integrations.list',
    fullyQualifiedName: 'connect.integrations.list',
    httpMethod: 'get',
    httpPath: '/v1/connect/integrations',
  },
  {
    clientCallName: 'client.connect.integrations.disconnect',
    fullyQualifiedName: 'connect.integrations.disconnect',
    httpMethod: 'delete',
    httpPath: '/v1/connect/integrations/{id}',
  },
  {
    clientCallName: 'client.platforms.list',
    fullyQualifiedName: 'platforms.list',
    httpMethod: 'get',
    httpPath: '/v1/platforms',
  },
  {
    clientCallName: 'client.posts.create',
    fullyQualifiedName: 'posts.create',
    httpMethod: 'post',
    httpPath: '/v1/posts/',
  },
  {
    clientCallName: 'client.posts.retrieve',
    fullyQualifiedName: 'posts.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/posts/{postId}',
  },
  {
    clientCallName: 'client.posts.list',
    fullyQualifiedName: 'posts.list',
    httpMethod: 'get',
    httpPath: '/v1/posts/',
  },
  {
    clientCallName: 'client.posts.delete',
    fullyQualifiedName: 'posts.delete',
    httpMethod: 'delete',
    httpPath: '/v1/posts/{postId}',
  },
  {
    clientCallName: 'client.posts.scheduled.list',
    fullyQualifiedName: 'posts.scheduled.list',
    httpMethod: 'get',
    httpPath: '/v1/posts/scheduled/',
  },
  {
    clientCallName: 'client.posts.scheduled.cancel',
    fullyQualifiedName: 'posts.scheduled.cancel',
    httpMethod: 'delete',
    httpPath: '/v1/posts/scheduled/{postId}',
  },
  {
    clientCallName: 'client.posts.scheduled.reschedule',
    fullyQualifiedName: 'posts.scheduled.reschedule',
    httpMethod: 'patch',
    httpPath: '/v1/posts/scheduled/{postId}',
  },
  {
    clientCallName: 'client.media.upload',
    fullyQualifiedName: 'media.upload',
    httpMethod: 'post',
    httpPath: '/v1/media/upload',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
