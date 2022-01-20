import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import cx from 'classnames';
import Image from 'next/image';
import React from 'react';

import {
  db,
  db_amazon,
  db_amazon_white,
  db_google,
  db_google_white,
  db_greenplum,
  db_greenplum_white,
  db_mysql,
  db_mysql_white,
  db_mysqlserver,
  db_mysqlserver_white,
  db_nettezza,
  db_nettezza_white,
  db_oracle,
  db_oracle_white,
  db_postgre,
  db_postgre_white,
  db_sap,
  db_sap_white,
  db_teradata,
  db_teradata_white,
  db_vertica,
  db_vertica_white,
  db_white,
} from '../../../../../../../common/images';
import { PALETTE_PRIMARY_MAIN } from '../../../../../../../config/theme';
import useStyles from './SelectDataBase.styles';

const DB_UPPER_IMAGES = [
  {
    image: db_mysql,
    image_active: db_mysql_white,
    label: 'My Sql',
    driver: 'mysql',
    enabled: true,
  },
  {
    image: db_mysqlserver,
    image_active: db_mysqlserver_white,
    label: 'SQL Server',
    driver: 'mssql+pymssql',
  },
  {
    image: db_postgre,
    image_active: db_postgre_white,
    label: 'POSTGRE',
    driver: 'postgresql+psycopg2',
  },
  {
    image: db_oracle,
    image_active: db_oracle_white,
    label: 'Oracle',
    driver: 'mssql+pymssql',
  },
  {
    image: db_vertica,
    image_active: db_vertica_white,
    label: 'Vertica',
    driver: 'mssql+pymssql',
  },
  {
    image: db_teradata,
    image_active: db_teradata_white,
    label: 'Teradata',
    driver: 'mssql+pymssql',
  },
];
const DB_LOWER_IMAGES = [
  {
    image: db_greenplum,
    image_active: db_greenplum_white,
    label: 'Green Plum',
    driver: 'mssql+pymssql',
  },
  {
    image: db_amazon,
    image_active: db_amazon_white,
    label: 'Amazon',
    driver: 'mssql+pymssql',
  },
  {
    image: db_google,
    image_active: db_google_white,
    label: 'Google',
    driver: 'mssql+pymssql',
  },
  {
    image: db_nettezza,
    image_active: db_nettezza_white,
    label: 'IBM Netezza',
    driver: 'mssql+pymssql',
  },
  {
    image: db_sap,
    image_active: db_sap_white,
    label: 'SAP Hana',
    driver: 'mssql+pymssql',
  },
  {
    image: db,
    image_active: db_white,
    label: 'Other',
    driver: 'mssql+pymssql',
  },
];
const SelectDataBase = ({ onClick, active }) => {
  const styles = useStyles();
  return [DB_UPPER_IMAGES, DB_LOWER_IMAGES].map((db, k) => (
    <Box className={styles.selectDbWrapper} key={k}>
      {db.map((data, i) => {
        return (
          <Box onClick={() => (data.enabled ? onClick(data) : null)} key={i}>
            <Box
              className={cx([
                styles.databases_list,
                !data.enabled && styles.disabled_db,
              ])}
              style={{
                background: active.label === data.label && PALETTE_PRIMARY_MAIN,
              }}
            >
              <Image
                src={
                  active.label === data.label ? data.image_active : data.image
                }
                width={35}
                height={35}
              />
            </Box>
            <Typography className={styles.dbLabel}>{data.label}</Typography>
          </Box>
        );
      })}
    </Box>
  ));
};

export default SelectDataBase;
