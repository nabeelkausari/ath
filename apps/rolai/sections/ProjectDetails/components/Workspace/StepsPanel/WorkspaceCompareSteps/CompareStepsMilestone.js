import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectMilestone } from '../../../../../../store/workspace/steps/compareSteps/actions';
import { SelectComp } from '../../../../../Dashboard/Calendar/CreateEvent/CreateEvent';
import useStyles from './WorkspaceCompareSteps.styles';

const CompareStepsMilestone = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { solve, steps } = useSelector((state) => state.workspace);

  const [milestone] = solve?.milestones || [];

  useEffect(() => {
    dispatch(selectMilestone(milestone?._links?.self?.href));
  }, [JSON.stringify(milestone)]);

  if (!solve?.milestones || solve?.milestones?.length === 0) return null;

  return (
    <Box className={styles.popup}>
      <Box>Select the milestone for which you want to compare steps</Box>
      <SelectComp
        items={solve.milestones
          .filter((m) => m._links.compare !== undefined)
          .sort((a, b) => a.sequence_number - b.sequence_number)
          ?.map((m) => ({
            label: `Milestone ${m?.sequence_number}`,
            value: m?._links?.self?.href,
          }))}
        onChange={(value) => dispatch(selectMilestone(value))}
        value={steps?.compare?.select_milestone?.selected_milestone_reference}
        placeholder="Select Milestone"
      />
      <Box className={styles.heading}>Note</Box>
      <Box className={styles.text}>
        Please note that your score upto the selected milestone will be frozen
        once you have compared your steps with the reference steps
      </Box>
    </Box>
  );
};

export default CompareStepsMilestone;
