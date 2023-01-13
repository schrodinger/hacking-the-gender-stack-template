import classnames from 'classnames/bind';
import { Typography } from '@mui/material';
import type { HTMLAttributes } from 'react';

import SmilesImage from '../../components/SmilesImage';
import t from '../../../translations/en.json';
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

  return (
    <div className={cx('core-info', className)} {...divProps}>
      <SmilesImage className={cx('core-image')} smiles={core.smiles} />
      <div className={cx('core-data')}>
        <div className={cx('core-field')}>
          <Typography variant="caption" fontWeight={600}>
            {t.enumeration.rgroups.coreSmilesTitle}
          </Typography>
          <Typography variant="body2">{core.smiles}</Typography>
        </div>
        <div className={cx('core-field')}>
          <Typography variant="caption" fontWeight={600}>
            {t.enumeration.rgroups.rgroupLabelsTitle}
          </Typography>
          <Typography variant="body2">{core.rgroup_labels.join(' | ')}</Typography>
        </div>
      </div>
    </div>
  );
}

export type { CoreInfoProps };
export default CoreInfo;
