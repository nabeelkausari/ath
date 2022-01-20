import Box from '@mui/material/Box';
import React from 'react';

import Button from '../../../../../components/Button/Button';
import useStyles from './ConsoleActions.styles';

const ConsoleActions = ({
  hideEditor,
}) => {
  const styles = useStyles();

  return (
    <Box className={styles.ActionsWrapper}>
      <Box>
        <Button
          onClick={()=> {}}
        >
          Run
        </Button>
      </Box>
      <Box>
        <Button
          variant="text"
          onClick={()=> {}}
        >
          Show Code
        </Button>
        <Button
          variant="outlined"
          onClick={()=> {}}
        >
          Submit Milestone
        </Button>
      </Box>
    </Box>
  );
};

export default ConsoleActions;
