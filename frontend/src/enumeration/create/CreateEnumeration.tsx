import classnames from 'classnames/bind';
import { Add } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import t from '../../translations/en.json';

import styles from './CreateEnumeration.module.scss';

const cx = classnames.bind(styles);

function CreateEnumeration() {
  const navigate = useNavigate();

  const handleNewEnumeration = () => {
    navigate('/enumeration/core');
  };

  return (
    <div className={cx('create-container')}>
      <Typography variant="h4" component="h1">
        {t.enumeration.create.heading}
      </Typography>
      <img src="/images/enumeration-create.svg" alt={t.enumeration.create.imageAlt} />
      <Button variant="contained" size="large" startIcon={<Add />} onClick={handleNewEnumeration}>
        {t.enumeration.create.newEnumeration}
      </Button>
    </div>
  );
}

export default CreateEnumeration;
