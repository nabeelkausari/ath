import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '../../../../../components/Button';
import Material from '../../../../../components/Material/Material';
import useStyles from './StepsPanel.styles';

const Overview = () => {
  const styles = useStyles();
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const { solve, workspace_solve_succeeded } = useSelector(
    (state) => state.workspace
  );

  useEffect(() => {
    if (workspace_solve_succeeded) {
      setSelectedMilestone(
        solve.milestones.sort(
          (a, b) => a.sequence_number - b.sequence_number
        )[0]
      );
    }
  }, [workspace_solve_succeeded]);

  if (!selectedMilestone) return null;

  return (
    <Box className={styles.overviewSection}>
      <Box display="flex" className={styles.milestone_list}>
        <Typography variant="subtitle2" pr={1}>
          {' '}
          Milestone{' '}
        </Typography>
        {solve?.milestones
          ?.sort((a, b) => a.sequence_number - b.sequence_number)
          ?.map((milestone, i) => {
            return (
              <Button
                key={i}
                className={cx(
                  styles.milestone__button,
                  parseInt(selectedMilestone.sequence_number) ===
                    parseInt(milestone.sequence_number) && styles.active
                )}
                onClick={() => setSelectedMilestone(milestone)}
              >
                {milestone.sequence_number}
              </Button>
            );
          })}
      </Box>
      <Material
        editorClassName="editor-milestone-overview"
        controlled
        material_link={selectedMilestone._links.material}
      />
    </Box>
  );
};

export default Overview;
