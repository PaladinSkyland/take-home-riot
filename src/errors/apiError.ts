export class ApiError extends Error {
  readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static badRequest(message: string) {
    return new ApiError(400, message);
  }

  static internal(message = 'Internal server error') {
    return new ApiError(500, message);
  }

  static notFound(message = 'Not found') {
    return new ApiError(404, message);
  }

  static custom(statusCode: number, message: string) {
    return new ApiError(statusCode, message);
  }
}
