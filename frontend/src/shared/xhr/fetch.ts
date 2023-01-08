/**
 * A convenience wrapper around the native Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/fetch)
 * that provides some sensible (overridable) defaults
 */
function fetch(input: URL | string, options?: RequestInit): Promise<Response> {
  const isCreateOrUpdate = ['POST', 'PUT', 'PATCH'].includes(options?.method || '');

  return window.fetch(input, {
    ...options,
    headers: {
      accept: 'application/json',
      ...(isCreateOrUpdate && { 'content-type': 'application/json' }),
      ...options?.headers,
    },
  });
}

export default fetch;
