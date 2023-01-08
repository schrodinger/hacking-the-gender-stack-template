import classnames from 'classnames/bind';
import { Button, Paper, Skeleton, Tooltip, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import type { ButtonProps, PaperProps, SkeletonProps } from '@mui/material';

import { getApiUrl } from '../../shared/xhr/utils';

import styles from './SmilesCard.module.scss';

const cx = classnames.bind(styles);

const IMAGE_API_URL = '/api/image/';

interface SmilesCardProps extends PaperProps {
  /**
   * Smiles string for a structure
   */
  smiles: string;
}

/**
 * Card to display a smiles string. Renders an image of the molecule represented by the smiles.
 */
function SmilesCard(props: SmilesCardProps) {
  const { smiles, className: paperClasses, ...paperProps } = props;
  const imageUrl = getApiUrl(IMAGE_API_URL);
  imageUrl.search = new URLSearchParams({ smiles }).toString();

  return (
    <Paper elevation={6} {...paperProps} className={cx('smiles-card', paperClasses)}>
      <img className={cx('image')} src={imageUrl.toString()} alt={smiles} />
      <div className={cx('smiles')}>
        <Tooltip
          slotProps={{ tooltip: { className: cx('tooltip') } }}
          title={smiles}
          placement="bottom"
        >
          <Typography variant="body1">{smiles}</Typography>
        </Tooltip>
      </div>
    </Paper>
  );
}

interface SmilesCardButtonProps extends Pick<SmilesCardProps, 'smiles'>, ButtonProps {
  /**
   * Determines if the card button renders as selected (selected cards render a border and check-mark)
   */
  selected?: boolean;
}

/**
 * Convenience button wrapper for SmilesCard
 */
SmilesCard.Button = function SmilesCardButton(props: SmilesCardButtonProps) {
  const { smiles, selected, className, ...buttonProps } = props;
  const buttonClasses = cx('smiles-card-button', selected && 'is-selected', className);

  return (
    <Button className={buttonClasses} {...buttonProps}>
      <SmilesCard smiles={smiles} />
      {selected && (
        <Paper className={cx('selected-check')} elevation={4}>
          <CheckCircle color="primary" fontSize="large" />
        </Paper>
      )}
    </Button>
  );
};

/**
 * Skeleton component for SmilesCard/SmilesCardButton. This can useful as a loading placeholder.
 */
function SmilesCardSkeleton(props: SkeletonProps) {
  return (
    <Skeleton
      {...props}
      className={cx('smiles-card', 'smiles-skeleton', props.className)}
      variant="rounded"
    />
  );
}

export type { SmilesCardProps, SmilesCardButtonProps };
export { SmilesCardSkeleton };
export default SmilesCard;
