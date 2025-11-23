import { BaseError } from "./BaseError.js";

interface ApiErrorResponse {
  errors?: { message: string; code?: string; path?: string[] }[];
  status?: string;
  statusCode?: number;
}

export class ApiError extends BaseError {
  public readonly details?: ApiErrorResponse;

  constructor(message: string, statusCode: number, details?: ApiErrorResponse) {
    super(message, statusCode, "ApiError");
    this.details = details;
  }

  static async fromResponse(response: Response): Promise<ApiError> {
    let message = `HTTP Error: ${response.status} ${response.statusText}`;
    let details: ApiErrorResponse | undefined = undefined;

    try {
      const json: ApiErrorResponse = await response.json();
      details = json;
      if (json.errors && json.errors[0]?.message) {
        message = json.errors[0].message;
      }
    } catch (parseError) {
      console.warn("Failed to parse error response as JSON:", parseError);
    }

    return new ApiError(message, response.status, details);
  }
}
