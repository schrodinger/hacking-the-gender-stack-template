import classnames from 'classnames/bind';
import {
  AccountTree,
  Forum,
  Home,
  Person,
  PieChart,
  Settings,
  ViewList,
} from '@mui/icons-material';
import { Badge, Paper } from '@mui/material';
import type { PaperProps } from '@mui/material';

import NavIconButton from './NavIconButton';
import styles from './Sidebar.module.scss';

const cx = classnames.bind(styles);

/**
 * User profile button rendered in the application sidebar
 */
function UserProfileButton(props: { notificationCount?: number }) {
  const { notificationCount } = props;

  const button = <NavIconButton className={cx('profile-button')} icon={Person} title="Profile" />;

  if (notificationCount) {
    return (
      <Badge className={cx('notification-badge')} badgeContent={notificationCount} color="error">
        {button}
      </Badge>
    );
  }

  return button;
}

/**
 * Application sidebar component
 */
function Sidebar(props: PaperProps) {
  return (
    <Paper {...props} className={cx('sidebar', props.className)} elevation={6}>
      <div className={cx('logo-icon')}>
        <img src="/images/schrodinger-logo.svg" alt="Schrodinger logo" />
      </div>

      <div className={cx('button-stack')}>
        <NavIconButton icon={Home} path="/" title="Home" exact />
        <NavIconButton icon={ViewList} path="/data" title="Data" />
        <NavIconButton icon={PieChart} title="Apple Pie" />
        <NavIconButton icon={AccountTree} title="Honestly no idea what this is" />
        <NavIconButton icon={Forum} title="Feedback (or Chat who knows)" />
      </div>

      <div className={cx('button-stack', 'user-pref-buttons')}>
        <NavIconButton className={cx('settings-button')} icon={Settings} title="Settings" />
        <UserProfileButton notificationCount={12} />
      </div>
    </Paper>
  );
}

export default Sidebar;
