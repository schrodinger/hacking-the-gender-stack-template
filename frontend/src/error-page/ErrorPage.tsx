import classnames from 'classnames/bind';
import { Paper, Typography } from '@mui/material';
import { isNil } from 'lodash';
import { useRouteError } from 'react-router';

import styles from './ErrorPage.module.scss';

const cx = classnames.bind(styles);

/**
 * Determines if a given object is Error-like i.e. if it satisfies the Error interface
 *
 * @param maybeError
 * @returns - True if `maybeError` has the same interface as an Error object, false otherwise
 */
function isErrorLike(maybeError: unknown): maybeError is Error {
  const { name, message } = (maybeError as Error) || {};
  return !isNil(name) && !isNil(message);
}

/**
 * Displays details of any route errors thrown in child routes
 */
function ErrorPage() {
  const error = useRouteError();
  let errorTitle = '';
  let errorDetails = '';

  if (isErrorLike(error)) {
    errorTitle = `${error.name}: ${error.message}`;
    errorDetails = error.stack || '';
  } else {
    errorDetails = JSON.stringify(error, undefined, 2);
  }

  return (
    <div className={cx('error-page')}>
      <Typography variant="h5">🚫 An unexpected error has occurred</Typography>
      <Paper className={cx('error-card')} component="pre" elevation={6}>
        <span className={cx('error-title')}>{errorTitle}</span>
        <span className={cx('error-details')}>{errorDetails}</span>
      </Paper>
    </div>
  );
}

export default ErrorPage;
