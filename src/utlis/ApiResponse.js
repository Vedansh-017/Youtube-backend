class ApiResponse {
  constructor(statusCode, message="Success", data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode >= 200 && statusCode < 300;
  }

  static success(message, data) {
    return new ApiResponse(200, message, data);
  }

  static error(statusCode, message) {
    return new ApiResponse(statusCode, message, null);
  }
}