import classnames from 'classnames/bind';
import { ArrowBack } from '@mui/icons-material';
import { IconButton, Paper, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { IconButtonProps } from '@mui/material';
import type { MouseEvent } from 'react';
import type { RelativeRoutingType } from 'react-router-dom';

import t from '../../translations/en.json';

import styles from './BackButton.module.scss';

const cx = classnames.bind(styles);

interface BackButtonProps extends IconButtonProps {
  /**
   * See https://reactrouter.com/en/main/components/link#relative
   */
  relative?: RelativeRoutingType;
}

/**
 * Button to go back in the react-router route hierarchy
 */
function BackButton(props: BackButtonProps) {
  const { relative, className, onClick, ...buttonProps } = props;
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      if (relative) {
        navigate('..', { relative: 'route' });
      } else {
        navigate(-1);
      }
    }
  };

  return (
    <Paper className={cx('back-button-container', className)} elevation={2}>
      <Tooltip title={t.back}>
        <IconButton {...buttonProps} onClick={handleClick}>
          <ArrowBack />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}

export default BackButton;
