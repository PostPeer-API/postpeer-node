export class PostPeerError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'PostPeerError';
  }
}

export class APIError extends PostPeerError {
  readonly status: number;
  readonly code?: string;
  readonly details?: unknown;
  readonly requestId?: string;
  readonly headers: Headers;

  constructor(
    status: number,
    message: string,
    options: {
      code?: string;
      details?: unknown;
      headers?: Headers;
      requestId?: string;
      cause?: unknown;
    } = {},
  ) {
    super(message, { cause: options.cause });
    this.name = 'APIError';
    this.status = status;
    this.code = options.code;
    this.details = options.details;
    this.headers = options.headers ?? new Headers();
    this.requestId = options.requestId;
  }
}

export class BadRequestError extends APIError {}
export class AuthenticationError extends APIError {}
export class PermissionDeniedError extends APIError {}
export class NotFoundError extends APIError {}
export class ConflictError extends APIError {}
export class UnprocessableEntityError extends APIError {}
export class RateLimitError extends APIError {}
export class InternalServerError extends APIError {}

export class APIConnectionError extends PostPeerError {
  constructor(message = 'Connection failed.', options?: ErrorOptions) {
    super(message, options);
    this.name = 'APIConnectionError';
  }
}

export class APIConnectionTimeoutError extends APIConnectionError {
  constructor(options?: ErrorOptions) {
    super('Request timed out.', options);
    this.name = 'APIConnectionTimeoutError';
  }
}

export class APIUserAbortError extends APIConnectionError {
  constructor(options?: ErrorOptions) {
    super('Request was aborted.', options);
    this.name = 'APIUserAbortError';
  }
}

const errorMessage = (body: unknown, response: Response): string => {
  if (typeof body === 'string' && body) return body;
  if (body && typeof body === 'object') {
    const value = body as Record<string, unknown>;
    if (typeof value['message'] === 'string') return value['message'];
    if (typeof value['error'] === 'string') return value['error'];
  }
  return response.statusText || `Request failed with status ${response.status}.`;
};

const errorCode = (body: unknown): string | undefined => {
  if (!body || typeof body !== 'object') return undefined;
  const code = (body as Record<string, unknown>)['code'];
  return typeof code === 'string' ? code : undefined;
};

export const createAPIError = (response: Response, body: unknown): APIError => {
  const options = {
    code: errorCode(body),
    details: body,
    headers: response.headers,
    requestId: response.headers.get('x-request-id') ?? undefined,
  };
  const message = errorMessage(body, response);

  switch (response.status) {
    case 400:
      return new BadRequestError(response.status, message, options);
    case 401:
      return new AuthenticationError(response.status, message, options);
    case 403:
      return new PermissionDeniedError(response.status, message, options);
    case 404:
      return new NotFoundError(response.status, message, options);
    case 409:
      return new ConflictError(response.status, message, options);
    case 422:
      return new UnprocessableEntityError(response.status, message, options);
    case 429:
      return new RateLimitError(response.status, message, options);
    default:
      return response.status >= 500 ?
          new InternalServerError(response.status, message, options)
        : new APIError(response.status, message, options);
  }
};
