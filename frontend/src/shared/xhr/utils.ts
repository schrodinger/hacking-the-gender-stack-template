import ApiError from './ApiError';

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

export { getFormattedErrorMessage };
