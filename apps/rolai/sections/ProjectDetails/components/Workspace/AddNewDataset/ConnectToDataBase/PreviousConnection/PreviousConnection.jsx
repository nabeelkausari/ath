import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import Input from '../../../../../../../components/Input/Input';
import RadioGroup from '../../../../../../../components/Radio/radio';
import useStyles from './PreviousConnection.styles';

const PreviousConnection = ({ previousConnection, setPreviousConnection }) => {
  const styles = useStyles();

  const Host = [
    {
      label: 'Dev - Server',
      value: 'Dev-server',
    },
    {
      label: 'QA - Server',
      value: 'QA-server',
    },
    {
      label: 'Prod - Server',
      value: 'Prod-server',
    },
  ];

  return (
    <>
      <Box className={styles.radioButtons}>
        <Typography variant="body2" color="textSecondary">
          Host
        </Typography>
        <RadioGroup
          radio_list={Host}
          onSelect={(value) =>
            setPreviousConnection({
              ...previousConnection,
              host: value,
            })
          }
          selected_id={previousConnection.host}
        />
      </Box>
      <Box>
        <Input
          placeholder="select * from user where user_id = 3333;"
          value={previousConnection.query}
          onChange={(e) =>
            setPreviousConnection({
              ...previousConnection,
              query: e.target.value,
            })
          }
          style={{ width: '100%' }}
          multiline
          minRows={5}
          label="Query"
        />
      </Box>
    </>
  );
};
export default PreviousConnection;
