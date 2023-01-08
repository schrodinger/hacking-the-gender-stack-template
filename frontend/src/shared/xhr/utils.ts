import ApiError from './ApiError';

declare global {
  interface ImportMetaEnv {
    VITE_BASE_API_URL: string;
  }
}

/**
 * Returns the full URL for the API server for a specific path
 */
function getApiUrl(path: string) {
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  return new URL(path, baseApiUrl);
}

/**
 * Returns a human readable error given an error object
 */
function getFormattedErrorMessage(error: unknown) {
  if (!error) {
    return 'Unknown error';
  } else if (error instanceof ApiError) {
    return `${error.status} - ${error.statusText}`;
  } else {
    return (error as Error).message || '';
  }
}

export { getApiUrl, getFormattedErrorMessage };
