import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

import { byUri } from '../../../../../../utils/helpers/byUri';
import OutputResult from '../../Output/OutputResult';
import useStyles from './WorkspaceCompareSteps.styles';

const CompareStepsFinal = () => {
  const styles = useStyles();
  const { list, compare } =
    useSelector((state) => state.workspace?.steps) || {};
  const { user_step_reference, reference_step } = compare?.compare_steps || {};
  const user_step = byUri(list)[user_step_reference];
  return (
    <Box className={styles.popup2}>
      <Box className={styles.flex}>
        <Box>
          <Typography variant="h5" component="h1" fontSize={'20px'}>
            Reference - Step {reference_step.sequence_number}
          </Typography>
          <Box marginTop={0.5}>
            Operation Name: {reference_step.operation_name}
          </Box>
          <OutputResult
            expanded
            step_details
            styles={{ margin: 0 }}
            results={reference_step}
          />
        </Box>
        <Box>
          <Typography variant="h5" component="h1" fontSize={'20px'}>
            User - Step {user_step.sequence_number}
          </Typography>
          <Box marginTop={0.5}>Operation Name: {user_step.operation_name}</Box>

          <OutputResult
            expanded
            step_details
            styles={{ margin: 0 }}
            results={user_step}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CompareStepsFinal;
