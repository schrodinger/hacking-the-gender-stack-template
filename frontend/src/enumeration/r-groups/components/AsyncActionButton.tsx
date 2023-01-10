import classnames from 'classnames/bind';
import { CircularProgress, Fab, Tooltip } from '@mui/material';
import type { FabProps } from '@mui/material';
import type { ReactNode } from 'react';

import styles from './AsyncActionButton.module.scss';

const cx = classnames.bind(styles);

interface AsyncActionButtonProps extends FabProps {
  /**
   * Text displayed inside the button
   */
  text: string;
  /**
   * Icon displayed inside the button
   */
  icon: ReactNode;
  /**
   * Tooltip describing the button's action
   */
  tooltip?: string;
  /**
   * Tooltip describing the reason the button is disabled. Only displayed when the `disabled` prop
   * is `true`.
   */
  disabledTooltip?: string;
  /**
   * Determines if the button should display a loading state
   */
  loading?: boolean;
}

/**
 * A convenience wrapper for a button used to kick off an async action (like an API request)
 */
function AsyncActionButton(props: AsyncActionButtonProps) {
  const { text, icon, tooltip, disabledTooltip, loading, disabled, className, ...buttonProps } =
    props;
  const tooltipText = disabled ? disabledTooltip || '' : tooltip || '';

  const loaderIcon = <CircularProgress color="inherit" size="1rem" />;

  return (
    <Tooltip title={tooltipText}>
      <span className={cx('button-wrapper')}>
        <Fab
          {...buttonProps}
          className={cx('async-button', className)}
          variant="extended"
          disabled={disabled || loading}
        >
          {loading ? loaderIcon : icon}
          {text}
        </Fab>
      </span>
    </Tooltip>
  );
}

export type { AsyncActionButtonProps };
export default AsyncActionButton;
