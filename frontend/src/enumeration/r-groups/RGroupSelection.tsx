import classnames from 'classnames/bind';
import { Alert, Slide, Snackbar, Stack } from '@mui/material';
import { Check } from '@mui/icons-material';
import { sortBy } from 'lodash';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import RegisterEntityButton from '../shared-views/RegisterEntityButton';
import t from '../../translations/en.json';
import { getFormattedErrorMessage } from '../../shared/xhr/utils';
import type { Core } from '../cores/service';

import AsyncActionButton from './components/AsyncActionButton';
import CoreDataProvider from './views/CoreDataProvider';
import CoreInfo from './components/CoreInfo';
import RGroupsTabs from './views/RGroupsTabs';
import styles from './RGroupSelection.module.scss';
import useEnumerationCallbackUrl from './hooks/useEnumerationCallbackUrl';
import { enumerateProperties, registerNewRGroup } from './service';
import type { RGroup } from './service';

const cx = classnames.bind(styles);

const RGROUPS_QUERY_KEY = ['rgroups'];

function RGroupSelection(props: { core: Core }) {
  const { core } = props;
  const [rgroupsDict, setRGroupsDict] = useState<Record<string, string[]>>({});
  const rgroupLists = Object.values(rgroupsDict);

  const navigate = useNavigate();
  const enumerationCallbackUrl = useEnumerationCallbackUrl();

  const [enumerationError, setEnumerationError] = useState('');
  const queryClient = useQueryClient();
  const { mutate: enumerate, isLoading: isEnumerationLoading } = useMutation({
    mutationFn: () => enumerateProperties({ core_smiles: core.smiles, rgroup_smiles: rgroupsDict }),
    onMutate: () => setEnumerationError(''),
    onError: (error) => {
      setEnumerationError(getFormattedErrorMessage(error));
    },
    onSuccess: (productsData) => {
      const enumerationParams = new URLSearchParams({
        products: productsData.products.join(','),
        coreId: `${core.id}`,
      });
      const propertiesPath = `${enumerationCallbackUrl}?${enumerationParams.toString()}`;

      navigate(propertiesPath);
    },
  });

  const handleRegisterRGroupSuccess = (rgroup: RGroup) => {
    // Optimistically update the current list and invalidate the query so it refetches from the server
    queryClient.setQueryData<RGroup[]>(RGROUPS_QUERY_KEY, (currentRGroups = []) =>
      sortBy([...currentRGroups, rgroup], 'id')
    );
    void queryClient.invalidateQueries(RGROUPS_QUERY_KEY);
  };

  const isDoneButtonDisabled =
    !rgroupLists.length || rgroupLists.some((rgroups) => !rgroups.length);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CoreInfo core={core} />
        <RegisterEntityButton
          label={t.enumeration.rgroups.addRGroup}
          registrationFn={registerNewRGroup}
          onSuccess={handleRegisterRGroupSuccess}
        />
      </Stack>
      <RGroupsTabs
        queryKey={RGROUPS_QUERY_KEY}
        rgroupLabels={core.rgroup_labels}
        onRGroupSelect={setRGroupsDict}
      />
      <span className={cx('done-button')}>
        <AsyncActionButton
          color="primary"
          text={t.enumeration.rgroups.done}
          disabledTooltip={t.enumeration.rgroups.selectionConstraint}
          icon={<Check />}
          loading={isEnumerationLoading}
          disabled={isDoneButtonDisabled}
          onClick={() => void enumerate()}
        />
      </span>
      <Snackbar
        className={cx('enumeration-snackbar')}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={10000}
        open={!!enumerationError}
        onClose={(_, reason) => reason === 'timeout' && setEnumerationError('')}
      >
        <Alert
          className={cx('enumeration-alert')}
          severity="error"
          variant="filled"
          onClose={() => setEnumerationError('')}
        >
          {enumerationError}
        </Alert>
      </Snackbar>
    </>
  );
}

export default function RGroupSelectionWrapper() {
  return (
    <CoreDataProvider className={cx('rgroup-selection')}>
      {(core) => <RGroupSelection core={core} />}
    </CoreDataProvider>
  );
}
