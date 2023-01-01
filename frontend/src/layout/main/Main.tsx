import classnames from 'classnames/bind';
import { Container } from '@mui/material';
import type { ReactNode } from 'react';

import Sidebar from './Sidebar';
import styles from './Main.module.scss';

const cx = classnames.bind(styles);

interface MainProps {
  children: ReactNode;
}

/**
 * The main application layout container
 */
function Main({ children }: MainProps) {
  return (
    <div className={cx('root-container')}>
      <Sidebar className={cx('sidebar')} />
      <Container className={cx('main-content')}>{children}</Container>
    </div>
  );
}

/**
 * Renders the given node under the main application layout container
 */
function withMainLayout(node: ReactNode) {
  return <Main>{node}</Main>;
}

export { withMainLayout };
export default Main;
