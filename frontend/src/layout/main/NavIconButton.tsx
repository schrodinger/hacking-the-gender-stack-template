import classnames from 'classnames/bind';
import { IconButton, Tooltip } from '@mui/material';
import { useMatches, useNavigate } from 'react-router';
import type { IconButtonProps } from '@mui/material';
import type { MouseEventHandler } from 'react';

import styles from './NavIconButton.module.scss';

const cx = classnames.bind(styles);

interface NavIconButtonProps extends IconButtonProps {
  /**
   * URL path this button should navigate to
   */
  path?: string;
  /**
   * The icon to display
   */
  icon: React.ComponentType;
  /**
   * The title for the button - this should ideally be a label for the button's associated route
   */
  title: string;
  /**
   * Determines whether the button should exactly match the current path to the path for this button
   * when implementing matched path behavior (like navigating and displaying an active state)
   */
  exact?: boolean;
}

/**
 * An icon button that navigates to the specified path (if provided) when clicked
 */
function NavIconButton(props: NavIconButtonProps) {
  const { path, icon: Icon, title, exact, ...buttonProps } = props;
  const navigate = useNavigate();
  const pathMatches = useMatches();
  const isPathActive =
    !!path &&
    (exact
      ? // If it is exactly this path then this path will be the last match in the pathMatches array
        pathMatches[pathMatches.length - 1]!.pathname === path
      : pathMatches.some((pathMatch) => pathMatch.pathname === path));

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isPathActive || !path) {
      return;
    }

    buttonProps.onClick?.(event);
    navigate(path);
  };

  return (
    <Tooltip title={title} placement="right" slotProps={{ tooltip: { className: cx('tooltip') } }}>
      <IconButton
        {...buttonProps}
        className={cx('nav-icon-button', isPathActive && 'active', buttonProps.className)}
        color={isPathActive ? 'primary' : 'default'}
        onClick={handleClick}
      >
        <Icon />
      </IconButton>
    </Tooltip>
  );
}

export type { NavIconButtonProps };
export default NavIconButton;
