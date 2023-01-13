import classnames from 'classnames/bind';
import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { times } from 'lodash';
import { useState } from 'react';
import type { PaperProps } from '@mui/material';

import styles from './TableSkeleton.module.scss';

const cx = classnames.bind(styles);

/**
 * Skeleton loading placeholder for the properties table
 */
function TableSkeleton(props: PaperProps) {
  const [numRows, setNumRows] = useState(0);
  const numPropColumns = 5;

  const measureNumRows = (divEl: HTMLDivElement | null) => {
    if (!divEl) {
      return;
    }
    const { height: containerHeight } = divEl.getBoundingClientRect();
    const { height: cellHeight } = divEl.querySelector('td')!.getBoundingClientRect();
    setNumRows(Math.floor((containerHeight - 35) / cellHeight));
  };

  const tableCells = [
    <TableCell key="compound" className={cx('compound-cell')}>
      <Skeleton variant="rounded" />
    </TableCell>,
    ...times(numPropColumns, (index) => (
      <TableCell key={`property-${index}`}>
        <Skeleton className={cx('property-skeleton')} />
      </TableCell>
    )),
  ];

  if (!numRows) {
    return (
      <div ref={measureNumRows} className={cx('measuring-box')}>
        <table>
          <tbody>
            <tr>{tableCells}</tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <TableContainer component={Paper} elevation={4} {...props}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              {times(numPropColumns, (index) => (
                <TableCell key={index} />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {times(numRows, (index) => (
              <TableRow key={index}>{tableCells}</TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableSkeleton;
