import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import cx from 'classnames';
import Image from 'next/image';
import React from 'react';

import { DataCasesIcon } from '../../common/images';
import useStyles from './AuthorDetails.styles';

const AuthorDetails = ({
  authImage = DataCasesIcon,
  customClass = '',
  ...props
}) => {
  const styles = useStyles();

  return (
    <CardHeader
      avatar={
        <Avatar
          aria-label="person"
          className={cx(styles.avatarRoot, customClass)}
        >
          <Image src={authImage} width={10} height={10} />
        </Avatar>
      }
      title={'Dr. Stacey Syphus'}
      subheader={'Assistant professor, Stanford University'}
      classes={{
        title: styles.authorTitle,
        subheader: styles.authorSubHeader,
      }}
      className={styles.root}
    />
  );
};

export default AuthorDetails;
