import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../../components/Button';
import LightTooltip from '../../../../../components/LightTooltip/LightTooltip';
import { showStepDetails } from '../../../../../store/workspace/steps/actions';
import { REFERENCE, USER } from '../../../../../utils/constants';
import useStyles from './StepsPanel.styles';
import WorkspaceCompareSteps from './WorkspaceCompareSteps/WorkspaceCompareSteps';

const StepsFooter = () => {
  const styles = useStyles();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { solve, steps } = useSelector((state) => state.workspace);
  const dispatch = useDispatch();
  const is_case = router?.query?.project_id !== undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'step-details-popover' : undefined;
  const has_reference_steps = solve?._links?.expert_steps;

  const handleStepDetails = (type) => {
    dispatch(showStepDetails(type));
    handleClose();
  };

  if (is_case) return null;

  return (
    <Box className={styles.stepsFooter}>
      <WorkspaceCompareSteps />
      <Button
        onClick={handleClick}
        endIcon={open ? <ArrowDownIcon /> : <ArrowUpIcon />}
        size="small"
        variant="contained-secondary"
        aria-describedby={id}
      >
        Step Details
      </Button>
      <Popover
        className={styles.stepsFooterPopover}
        id={id}
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <nav aria-label="secondary mailbox folders">
          <List>
            {steps?.list?.length > 1 ? (
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleStepDetails(USER)}>
                  <ListItemText primary="User Step Details" />
                </ListItemButton>
              </ListItem>
            ) : (
              <LightTooltip
                title="User Step Details option would be available once you execute any step"
                arrow
                placement="left"
              >
                <ListItem disablePadding>
                  <ListItemButton disabled>
                    <ListItemText primary="User Step Details" />
                  </ListItemButton>
                </ListItem>
              </LightTooltip>
            )}
            {has_reference_steps ? (
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleStepDetails(REFERENCE)}>
                  <ListItemText primary="Reference Step Details" />
                </ListItemButton>
              </ListItem>
            ) : (
              <LightTooltip
                title="Reference step option will be available after milestone submission"
                arrow
                placement="left"
              >
                <ListItem disablePadding>
                  <ListItemButton disabled>
                    <ListItemText primary="Reference Step Details" />
                  </ListItemButton>
                </ListItem>
              </LightTooltip>
            )}
          </List>
        </nav>
      </Popover>
    </Box>
  );
};

export default StepsFooter;
