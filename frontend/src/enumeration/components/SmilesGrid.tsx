import classnames from 'classnames/bind';
import { range } from 'lodash';
import { useLayoutEffect, useRef, useState } from 'react';
import type { HTMLAttributes, MouseEvent } from 'react';

import SmilesCard, { SmilesCardSkeleton } from './SmilesCard';
import styles from './SmilesGrid.module.scss';

const cx = classnames.bind(styles);

interface SmilesData {
  id: string | number;
  smiles: string;
}

interface SmilesGridProps<SData extends SmilesData = SmilesData>
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * List of structure smiles to display in the grid
   */
  smilesList: SData[];
  /**
   * List of smiles IDs that should be displayed as selected
   */
  selectedSmiles?: (string | number)[];
  /**
   * Callback triggered when a smiles card is clicked
   */
  onSmilesClick?: (smiles: SData, event: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Responsive grid of SmilesCard elements
 */
function SmilesGrid<S extends SmilesData>(props: SmilesGridProps<S>) {
  const { smilesList, selectedSmiles, onSmilesClick, className, ...divProps } = props;

  return (
    <div className={cx('smiles-grid-parent', className)} {...divProps}>
      {smilesList.map((smilesData) => (
        <SmilesCard.Button
          key={smilesData.id}
          smiles={smilesData.smiles}
          selected={!!selectedSmiles?.includes(smilesData.id)}
          onClick={(event) => onSmilesClick?.(smilesData, event)}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton view for SmilesGrid. This can be useful as a loading placeholder.
 */
function SmilesGridSkeleton(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...divProps } = props;
  const [numGridItems, setNumGridItems] = useState(0);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const gridContainer = gridContainerRef.current!;
    const dummySkeletonCard = gridContainer.querySelector<HTMLSpanElement>('.dummy-skeleton')!;

    const gridRect = gridContainer.getBoundingClientRect();
    const skeletonRect = dummySkeletonCard.getBoundingClientRect();
    const numRows = Math.floor(gridRect.height / skeletonRect.height);
    const numCols = Math.floor(gridRect.width / skeletonRect.width);

    setNumGridItems(numRows * numCols);
  }, []);

  return (
    <div
      ref={gridContainerRef}
      className={cx('smiles-grid-parent', !numGridItems ? 'h-full' : 'clamped-grid', className)}
      {...divProps}
    >
      {!numGridItems && <SmilesCardSkeleton className="dummy-skeleton" />}
      {range(numGridItems).map((index) => (
        <SmilesCardSkeleton key={index} />
      ))}
    </div>
  );
}

export { SmilesGridSkeleton };
export default SmilesGrid;
