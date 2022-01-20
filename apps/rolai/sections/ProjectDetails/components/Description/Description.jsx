import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

import Material from '../../../../components/Material/Material';
import useStyles from './Description.styles';

const Description = ({ project }) => {
  const styles = useStyles();

  return (
    <Box className={styles.about}>
      <Typography variant="h4" pb={2}>
        Description
      </Typography>

      <Typography pb={3}>
        <Material
          controlled={true}
          material_link={project?._links?.get_case_material}
          update_link={project?._links?.edit_case_material}
        />
      </Typography>
    </Box>
  );
};

export default Description;
