import classnames from 'classnames/bind';
import { Button, Typography } from '@mui/material';
import type { HTMLAttributes, MouseEventHandler } from 'react';

import t from '../../translations/en.json';

import styles from './ErrorStatus.module.scss';

const cx = classnames.bind(styles);

interface ErrorStatusProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Error message to display
   */
  message?: string;
  /**
   * Callback triggered when the "Try Again" button is clicked.
   * The button is not rendered if this callback is not provided.
   */
  onRetry?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Component to display when a view has an error status
 */
function ErrorStatus(props: ErrorStatusProps) {
  const { message, onRetry, className, ...divProps } = props;

  return (
    <div className={cx('error-status-container', className)} {...divProps}>
      <img
        className={cx('error-image')}
        src="/images/broken_test_tube.svg"
        alt={t.errorStatus.imageAlt}
      />
      <Typography className={cx('error-message')} variant="h5" component="span">
        {message ?? t.errorStatus.message}
      </Typography>
      {onRetry && (
        <Button variant="contained" color="primary" size="large" onClick={onRetry}>
          {t.errorStatus.tryAgain}
        </Button>
      )}
    </div>
  );
}

export type { ErrorStatusProps };
export default ErrorStatus;
