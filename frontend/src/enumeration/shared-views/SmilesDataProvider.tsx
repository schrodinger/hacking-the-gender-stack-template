import classnames from 'classnames/bind';
import { LinearProgress } from '@mui/material';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { HTMLAttributes, ReactNode } from 'react';
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import ErrorStatus from '../components/ErrorStatus';
import NoContent from '../components/NoContent';
import { SmilesGridSkeleton } from '../components/SmilesGrid';

import styles from './SmilesDataProvider.module.scss';

const cx = classnames.bind(styles);

interface SmilesData {
  id: string | number;
  smiles: string;
}

interface SmilesDataProviderProps<SData extends SmilesData = SmilesData>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Render prop to render the contentful view for this data
   */
  children: (data: SData[], queryResult: UseQueryResult<SData[]>) => ReactNode;
  /**
   * Query options to fetch data from an API
   */
  queryOptions: UseQueryOptions<SData[]>;
  /**
   * User facing messages in UI rendered by the data provider
   */
  messages?: { noContent?: string; noFilterMatch?: string };
  /**
   * Callback to filter the results from the API query
   */
  filter?: (datum: SData) => boolean;
}

/**
 * Higher level component that fetches a data list from the server and provides the results to its
 * children via a render prop
 */
function SmilesDataProvider<S extends SmilesData>(props: SmilesDataProviderProps<S>) {
  const { children, queryOptions, messages, filter, className, ...divProps } = props;
  const queryResult = useQuery(queryOptions);

  const content = useMemo(() => {
    const { data, status, refetch, isFetching } = queryResult;

    if (status === 'loading') {
      return <SmilesGridSkeleton />;
    }
    if (status === 'error') {
      return <ErrorStatus onRetry={() => void refetch()} />;
    }

    const filteredData = filter ? data.filter(filter) : data;
    if (!filteredData.length) {
      // If there was query data but no filtered data that means the filter didn't match anything
      const noContentMessage = data.length ? messages?.noFilterMatch : messages?.noContent;
      return <NoContent message={noContentMessage} />;
    }
    return (
      <>
        {isFetching && <LinearProgress className={cx('fetch-progress')} color="secondary" />}
        {children(filteredData, queryResult)}
      </>
    );
  }, [children, filter, messages?.noContent, messages?.noFilterMatch, queryResult]);

  return (
    <div className={cx('data-container', className)} {...divProps}>
      {content}
    </div>
  );
}

export type { SmilesDataProviderProps };
export default SmilesDataProvider;
