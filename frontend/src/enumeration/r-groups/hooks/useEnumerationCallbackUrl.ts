import { useMatches } from 'react-router';

/**
 * Custom react hook to provide the callback URL to navigate to once we've enumerated products from
 * the selected core and rgroups
 */
function useEnumerationCallbackUrl() {
  const pathMatches = useMatches();
  /**
   * Since this component doesn't render an <Outlet /> the last path match belongs to the route for
   * this element
   */
  const pathData = pathMatches[pathMatches.length - 1]!;
  const { enumerationCallbackUrl } = pathData.handle as { enumerationCallbackUrl: string };

  return enumerationCallbackUrl;
}

export default useEnumerationCallbackUrl;
