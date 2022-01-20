import Box from '@mui/material/Box';
import Image from 'next/image';
import React from 'react';

import { QuestionIcon } from '/common/images';

import Input from '../../../../../../../components/Input/Input';
import useStyles from './NewConnectionCustom.styles';

const NewConnectionCustom = ({
  customNewConnection,
  setCustomNewConnection,
}) => {
  const styles = useStyles();

  return (
    <>
      <Box>
        <div className={styles.connectionString}>
          <div className={styles.text}>Connection String</div>
          {/*<Image*/}
          {/*  className={styles.icon}*/}
          {/*  src={QuestionIcon}*/}
          {/*  width={14.73}*/}
          {/*  height={14.73}*/}
          {/*/>*/}
        </div>

        <Input
          style={{ width: '100%' }}
          placeholder={'mysql+pymysql://root:password@localhost:3306/'}
          value={customNewConnection.connectionString}
          onChange={(e) =>
            setCustomNewConnection({
              ...customNewConnection,
              connectionString: e.target.value,
            })
          }
        />
      </Box>
      <Box>
        <div className={styles.connectionString}>
          <div className={styles.text}>Query</div>
          {/*<Image*/}
          {/*  className={styles.icon}*/}
          {/*  src={QuestionIcon}*/}
          {/*  width={14.73}*/}
          {/*  height={14.73}*/}
          {/*/>*/}
        </div>

        <Input
          style={{ width: '100%' }}
          placeholder="select * from user where user_id = 3333;"
          value={customNewConnection.query}
          onChange={(e) =>
            setCustomNewConnection({
              ...customNewConnection,
              query: e.target.value,
            })
          }
          multiline
          minRows={5}
        />
      </Box>
    </>
  );
};
export default NewConnectionCustom;
