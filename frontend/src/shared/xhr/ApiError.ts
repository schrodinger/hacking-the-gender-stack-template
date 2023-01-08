/**
 * Error class for API errors to essentially wrap Response objects in an Error instance.
 * This class should not be used for network errors and such, those should be propagated as is.
 */
class ApiError extends Error {
  override name = 'ApiError';
  status: number;
  statusText: string;
  rawResponse: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.status = response.status;
    this.statusText = response.statusText;

    this.rawResponse = response.clone();
  }
}

export default ApiError;
