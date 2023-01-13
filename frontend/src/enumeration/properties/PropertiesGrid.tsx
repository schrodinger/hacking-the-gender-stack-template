import classnames from 'classnames/bind';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { omit } from 'lodash';
import { useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { CSSProperties, MouseEvent } from 'react';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import BackButton from '../components/BackButton';
import ErrorStatus from '../components/ErrorStatus';
import NoContent from '../components/NoContent';
import SmilesImage from '../components/SmilesImage';
import t from '../../translations/en.json';

import TableSkeleton from './components/TableSkeleton';
import styles from './PropertiesGrid.module.scss';
import { fetchProductProperties } from './service';

const cx = classnames.bind(styles);

function PropertiesGrid() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const products = params.get('products')?.split(',') || [];
  const coreId = params.get('coreId');

  const { data, status, refetch } = useQuery({
    queryKey: ['products', ...products],
    queryFn: () => fetchProductProperties(products),
    enabled: !!products.length,
  });

  const handleBackClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      // Go back to R-Groups selection if we know what core was selected, otherwise just go to core selection
      navigate(`../core${coreId ? `/${coreId}/r-groups` : ''}`, { relative: 'path' });
    },
    [coreId, navigate]
  );

  const content = useMemo(() => {
    if (!products.length) {
      return <NoContent message={t.enumeration.properties.noContent} />;
    }

    if (status === 'loading') {
      return <TableSkeleton />;
    }

    if (status === 'error') {
      return <ErrorStatus onRetry={() => void refetch()} />;
    }

    const calculatedProperties = Object.keys(omit(data[0], ['compound', 'id']));
    const columns: GridColDef[] = [
      {
        field: 'id',
        headerName: t.enumeration.properties.id,
        width: 40,
        minWidth: 40,
        sortable: false,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
      },
      {
        field: 'compound',
        headerName: t.enumeration.properties.compound,
        width: 175,
        minWidth: 175,
        sortable: false,
        hideable: false,
        filterable: false,
        renderCell: (params: GridRenderCellParams<string>) => (
          <SmilesImage
            className={cx('smiles-image')}
            smiles={params.value!}
            style={{ '--smiles-image-size': '150px' } as CSSProperties}
          />
        ),
      },
      ...calculatedProperties.map(
        (propName): GridColDef => ({
          field: propName,
          headerName: propName,
          type: 'number',
          align: 'left',
          headerAlign: 'left',
        })
      ),
    ];
    return (
      <DataGrid
        rows={data}
        columns={columns}
        getRowHeight={() => 'auto'}
        pageSize={25}
        rowsPerPageOptions={[25]}
        disableVirtualization
      />
    );
  }, [data, products.length, refetch, status]);

  return (
    <div className={cx('properties-container')}>
      <Typography variant="h4" component="h1" color="primary" fontWeight={600} textAlign="center">
        {t.enumeration.properties.enumeratedProperties}
      </Typography>
      <Typography textAlign="center">{t.enumeration.properties.subtitle}</Typography>
      <div className={cx('table-container')}>{content}</div>
      <BackButton className={cx('back-button')} onClick={handleBackClick} />
    </div>
  );
}

export default PropertiesGrid;
