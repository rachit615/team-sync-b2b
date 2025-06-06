const httpConfig = () => ({
  // success responses
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // client error responses
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  METHOD_NOT_ALLOWED: 405,
  UNPROCESSABLE_ENTITY: 422,

  // server error responses
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
});

export const HTTP_STATUS = httpConfig();

export type HttpStatusCodeType = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
