import classnames from 'classnames/bind';
import { Add } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';

import t from '../../translations/en.json';

import styles from './CreateEnumeration.module.scss';

const cx = classnames.bind(styles);

function CreateEnumeration() {
  return (
    <div className={cx('create-container')}>
      <Typography variant="h4" component="h1">
        {t.enumeration.create.heading}
      </Typography>
      <img src="/images/enumeration-create.svg" alt={t.enumeration.create.imageAlt} />
      <Button variant="contained" size="large" startIcon={<Add />}>
        {t.enumeration.create.newEnumeration}
      </Button>
    </div>
  );
}

export default CreateEnumeration;
