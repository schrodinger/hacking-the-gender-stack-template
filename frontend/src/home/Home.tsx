import classnames from 'classnames/bind';
import { Typography } from '@mui/material';

import styles from './Home.module.scss';

const cx = classnames.bind(styles);

/**
 * Home page component
 */
function Home() {
  return (
    <div className={cx('home-container')}>
      <Typography variant="h2" fontWeight={700} color="primary">
        Welcome to
        <br />
        Hacking the Gender Stack
      </Typography>

      <Typography variant="h6" component="span">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Schrödinger's first hackathon! I've never written good copy in my life so someone more
        qualified than me should fill this in.
      </Typography>
    </div>
  );
}

export default Home;
