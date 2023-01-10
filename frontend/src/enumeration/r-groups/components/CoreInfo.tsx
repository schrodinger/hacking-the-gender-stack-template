import classnames from 'classnames/bind';
import { Typography } from '@mui/material';
import type { HTMLAttributes } from 'react';

import { getApiUrl } from '../../../shared/xhr/utils';
import type { Core } from '../../cores/service';

import styles from './CoreInfo.module.scss';

const cx = classnames.bind(styles);

interface CoreInfoProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Core scaffold data
   */
  core: Core;
}

/**
 * Component to display data about a core
 */
function CoreInfo(props: CoreInfoProps) {
  const { core, className, ...divProps } = props;
  const coreImgUrl = getApiUrl('api/image/');
  coreImgUrl.search = new URLSearchParams({ smiles: core.smiles }).toString();

  return (
    <div className={cx('core-info', className)} {...divProps}>
      <img className={cx('core-image')} src={coreImgUrl.toString()} alt={core.smiles} />
      <div className={cx('core-data')}>
        <div className={cx('core-field')}>
          <Typography variant="caption" fontWeight={600}>
            Core Smiles:
          </Typography>
          <Typography variant="body2">{core.smiles}</Typography>
        </div>
        <div className={cx('core-field')}>
          <Typography variant="caption" fontWeight={600}>
            R-Group labels:
          </Typography>
          <Typography variant="body2">{core.rgroup_labels.join(' | ')}</Typography>
        </div>
      </div>
    </div>
  );
}

export type { CoreInfoProps };
export default CoreInfo;
