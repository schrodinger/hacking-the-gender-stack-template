import classnames from 'classnames/bind';
import { Typography } from '@mui/material';
import type { HTMLAttributes } from 'react';

import t from '../../translations/en.json';

import styles from './NoContent.module.scss';

const cx = classnames.bind(styles);

interface NoContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Message to display when no content is available
   */
  message?: string;
}

/**
 * Component to display when no data-full content is available for a view
 */
function NoContent(props: NoContentProps) {
  const { message, className, ...divProps } = props;
  return (
    <div className={cx('no-content-container', className)} {...divProps}>
      <img
        className={cx('no-content-image')}
        src="/images/empty_box.svg"
        alt={t.noContent.imageAlt}
      />
      <Typography variant="subtitle2" component="span">
        {t.noContent.subtitle}
      </Typography>
      <Typography className={cx('no-content-message')} variant="h5" component="span">
        {message ?? t.noContent.message}
      </Typography>
    </div>
  );
}

export type { NoContentProps };
export default NoContent;
