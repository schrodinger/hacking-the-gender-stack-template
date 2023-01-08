import classnames from 'classnames/bind';
import { TextField, Typography } from '@mui/material';
import { sortBy } from 'lodash';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import RegisterEntityButton from '../shared-views/RegisterEntityButton';
import SmilesDataProvider from '../shared-views/SmilesDataProvider';
import SmilesGrid from '../components/SmilesGrid';
import t from '../../translations/en.json';

import styles from './CoreSelection.module.scss';
import { fetchAllCores, registerNewCore } from './service';
import type { Core } from './service';

const cx = classnames.bind(styles);

const CORES_QUERY_KEY = ['cores'];

function CoreSelection() {
  const [smilesQuery, setSmilesQuery] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleCoreRegisterSuccess = (core: Core) => {
    // Optimistically update the current list and invalidate the query so it refetches from the server
    queryClient.setQueryData<Core[]>(CORES_QUERY_KEY, (currentCores = []) =>
      sortBy([...currentCores, core], 'id')
    );
    void queryClient.invalidateQueries(CORES_QUERY_KEY);
  };

  const handleCoreClick = (core: Core) => {
    navigate(`${core.id}/r-groups`);
  };

  return (
    <div className={cx('core-selection-container')}>
      <Typography className={cx('heading')} variant="h4" component="h1">
        {t.enumeration.cores.pickACore}
      </Typography>
      <div className={cx('cores-search-add')}>
        <TextField
          className={cx('search-field')}
          variant="outlined"
          label={t.smilesSearch.label}
          value={smilesQuery}
          onChange={(event) => setSmilesQuery(event.target.value.trimStart())}
        />
        <RegisterEntityButton
          label={t.enumeration.cores.addCore}
          registrationFn={registerNewCore}
          onSuccess={handleCoreRegisterSuccess}
        />
      </div>
      <SmilesDataProvider
        className={cx('grid-container')}
        queryOptions={{ queryKey: CORES_QUERY_KEY, queryFn: fetchAllCores }}
        filter={smilesQuery ? (core) => core.smiles.includes(smilesQuery) : undefined}
        messages={{
          noContent: t.enumeration.cores.noContent,
          noFilterMatch: t.smilesSearch.noMatchMessage,
        }}
      >
        {(coresData) => <SmilesGrid smilesList={coresData} onSmilesClick={handleCoreClick} />}
      </SmilesDataProvider>
    </div>
  );
}

export default CoreSelection;
