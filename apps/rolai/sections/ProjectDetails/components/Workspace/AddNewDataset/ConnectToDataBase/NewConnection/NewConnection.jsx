import Box from '@mui/material/Box';
import React from 'react';

import Input from '../../../../../../../components/Input/Input';
import useStyles from './NewConnection.styles';

const NewConnection = ({ newConnection, setNewConnection }) => {
  const styles = useStyles();

  return (
    <Box display="flex" className={styles.newConnection}>
      <Box mr={2}>
        <Input
          placeholder={''}
          value={newConnection.host}
          onChange={(e) =>
            setNewConnection({
              ...newConnection,
              host: e.target.value,
            })
          }
          label="Host"
        />
        <Input
          placeholder={''}
          value={newConnection.port}
          onChange={(e) =>
            setNewConnection({
              ...newConnection,
              port: e.target.value,
            })
          }
          label="Port"
        />
        <Input
          placeholder={''}
          value={newConnection.username}
          onChange={(e) =>
            setNewConnection({
              ...newConnection,
              username: e.target.value,
            })
          }
          label="Username"
        />
      </Box>
      <Box>
        <Input
          placeholder={''}
          value={newConnection.databaseName}
          onChange={(e) =>
            setNewConnection({
              ...newConnection,
              databaseName: e.target.value,
            })
          }
          label="Database Name"
        />
        <Input
          placeholder={''}
          value={newConnection.query}
          onChange={(e) =>
            setNewConnection({
              ...newConnection,
              query: e.target.value,
            })
          }
          label="Query"
        />
        <Input
          placeholder={''}
          value={newConnection.password}
          onChange={(e) =>
            setNewConnection({
              ...newConnection,
              password: e.target.value,
            })
          }
          label="Password"
        />
      </Box>
    </Box>
  );
};
export default NewConnection;
