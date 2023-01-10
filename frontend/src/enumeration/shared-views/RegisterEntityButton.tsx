import classnames from 'classnames/bind';
import { Add } from '@mui/icons-material';
import { Alert, Button, LinearProgress, Paper, Popover, TextField } from '@mui/material';
import { template } from 'lodash';
import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { ButtonProps } from '@mui/material';
import type { ChangeEvent, MouseEvent } from 'react';

import t from '../../translations/en.json';
import { getFormattedErrorMessage } from '../../shared/xhr/utils';

import styles from './RegisterEntityButton.module.scss';

const cx = classnames.bind(styles);

interface RegisterEntityButtonProps<T = unknown> extends ButtonProps {
  /**
   * Label text for the button
   */
  label: string;
  /**
   * Callback to register a new entity with smiles data with the API server
   */
  registrationFn: (smiles: string) => Promise<T>;
  /**
   * Callback triggered when the registration transaction is successfully completed
   */
  onSuccess?: (data: T, inputSmiles: string) => void;
}

/**
 * Button to register a new entity (like a Core or an R-Group) with the API server
 */
function RegisterEntityButton<T = unknown>(props: RegisterEntityButtonProps<T>) {
  const { label, registrationFn, onSuccess, ...buttonProps } = props;
  const [registerButton, setRegisterButton] = useState<HTMLButtonElement | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [smiles, setSmiles] = useState('');
  const [smilesError, setSmilesError] = useState(false);

  const {
    status,
    error,
    mutate: registerEntity,
    reset: resetEntityMutation,
  } = useMutation({
    mutationFn: registrationFn,
    onSuccess: (data, smiles) => {
      setSmiles('');
      onSuccess?.(data, smiles);
    },
  });

  const handleSmilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setSmilesError(!inputValue);
    setSmiles(inputValue.trimStart());
  };

  const handleRegisterButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    buttonProps.onClick?.(event);
    if (!event.defaultPrevented) {
      setIsPopoverOpen(true);
    }
  };

  const handlePopoverClose = () => {
    if (status === 'loading') {
      return;
    }
    setIsPopoverOpen(false);
    setSmiles('');
    setSmilesError(false);
    resetEntityMutation();
  };

  const popoverContent = useMemo(() => {
    const handleSubmit = () => {
      if (!smiles.trim()) {
        setSmilesError(true);
        return;
      }
      registerEntity(smiles.trim());
    };

    const successBanner = (
      <Alert className={cx('alert')} severity="success">
        {t.success}
      </Alert>
    );
    const errorBanner = (
      <Alert className={cx('alert')} severity="error">
        {template(t.registerEntity.errorAlert)({ message: getFormattedErrorMessage(error) })}
      </Alert>
    );

    return (
      <Paper className={cx('popover-content')}>
        {status === 'loading' && (
          <LinearProgress className={cx('linear-progress')} color="secondary" />
        )}
        <TextField
          className={cx('smiles-field')}
          multiline
          minRows={3}
          maxRows={3}
          color="secondary"
          label={t.registerEntity.smilesLabel}
          disabled={status === 'loading'}
          error={smilesError}
          value={smiles}
          onChange={handleSmilesChange}
          InputProps={{ className: cx('textarea') }}
        />
        <div className={cx('button-bar')}>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            disabled={status === 'loading' || !smiles.trim()}
            onClick={handleSubmit}
          >
            {t.registerEntity.submit}
          </Button>
        </div>
        {status === 'success' && successBanner}
        {status === 'error' && errorBanner}
      </Paper>
    );
  }, [error, smilesError, registerEntity, smiles, status]);

  return (
    <>
      <Button
        ref={setRegisterButton}
        variant="contained"
        size="large"
        startIcon={<Add />}
        {...buttonProps}
        onClick={handleRegisterButtonClick}
      >
        {label}
      </Button>
      <Popover
        className={cx('popover')}
        open={isPopoverOpen}
        anchorEl={registerButton}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handlePopoverClose}
      >
        {popoverContent}
      </Popover>
    </>
  );
}

export type { RegisterEntityButtonProps };
export default RegisterEntityButton;
