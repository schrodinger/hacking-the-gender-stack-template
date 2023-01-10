import classnames from 'classnames/bind';
import { CircularProgress, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { HTMLAttributes, ReactNode } from 'react';

import ApiError from '../../../shared/xhr/ApiError';
import BackButton from '../../components/BackButton';
import ErrorStatus from '../../components/ErrorStatus';
import t from '../../../translations/en.json';
import { fetchCore } from '../../cores/service';
import type { Core } from '../../cores/service';

import styles from './CoreDataProvider.module.scss';

const cx = classnames.bind(styles);

interface CoreDataProviderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: (coreData: Core) => ReactNode;
}

/**
 * Wrapper component for the R-Groups selection view that provides a skeleton UI container and data
 * about the selected core to its children via a render prop
 */
function CoreDataProvider(props: CoreDataProviderProps) {
  const { children, className, ...divProps } = props;
  const { coreId } = useParams() as { coreId: string };
  const {
    status,
    error,
    data: core,
    refetch,
  } = useQuery({ queryKey: ['core', coreId], queryFn: () => fetchCore(coreId) });

  const content = useMemo(() => {
    if (status === 'loading') {
      return (
        <div className={cx('loader')}>
          <CircularProgress />
        </div>
      );
    }

    if (status === 'error') {
      const isNotFound = error instanceof ApiError && error.status === 404;
      const message = isNotFound ? t.enumeration.cores.notFoundMessage : undefined;
      return (
        <div className={cx('error')}>
          <ErrorStatus message={message} onRetry={() => void refetch()} />
        </div>
      );
    }

    return children(core);
  }, [children, core, error, refetch, status]);

  return (
    <div className={cx('core-data-container', className)} {...divProps}>
      <BackButton className={cx('back-button')} relative="route" />
      <Typography className={cx('heading')} variant="h4" component="h1">
        {t.enumeration.rgroups.pickRGroups}
      </Typography>
      {content}
    </div>
  );
}

export type { CoreDataProviderProps };
export default CoreDataProvider;
