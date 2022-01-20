import AddIcon from '@mui/icons-material/Add';
import { Input, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import MuiInputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearCloneProject,
  cloneProject,
  createProject,
  getCaseCategories,
} from '../../store/cases/actions';
import {
  hideDialog,
  setDialogParams,
  showDialog,
} from '../../store/global/actions';
import { notify } from '../../utils/helpers/notification';
import Button from '../Button';
// import Input from '../Input';
import useStyles from './CloneProject.styles';

const MenuProps = {
  PaperProps: {
    style: {
      borderRadius: 10,
    },
  },
};

const CloneProjectDialog = (status = false) => {
  const styles = useStyles();

  const dispatch = useDispatch();
  const { clone_project_succeeded, case_categories } = useSelector(
    (state) => state.cases
  );
  const { dialog_params } = useSelector((state) => state.global);

  useEffect(() => {
    dispatch(getCaseCategories());
  }, []);

  const handleChange = (key, value) => {
    if (key == 'name' && value.length > 250)
      return notify.error('Charectors should be less than 250');
    dispatch(setDialogParams({ key, value }));
  };

  return clone_project_succeeded ? (
    <Box>
      <Typography style={{ fontWeight: 'bold' }}>
        Successfully {status ? 'Created' : 'Cloned'}
      </Typography>
      <Typography>
        Do you want to open the {status ? 'created' : 'cloned'} project?
      </Typography>
    </Box>
  ) : (
    <Box
      style={{ marginBottom: status ? '75px' : '0' }}
      className={styles.parent}
    >
      <Box>
        <Box className={styles.label}>Project Name</Box>
        <Input
          // placeholder={'Project Name'}
          value={dialog_params?.name}
          className={styles.inputField}
          onChange={(e) => handleChange('name', e.target.value)}
          // label="New Project Name"
        />
      </Box>
      {status && (
        <Box className={styles.descriptionWrapper}>
          <Box className={styles.label}>Project Overview</Box>
          <Input
            // placeholder={'Project Overview'}
            className={styles.inputField}
            value={dialog_params?.overview}
            onChange={(e) => handleChange('overview', e.target.value)}
            multiline
            minRows={5}
            // label="Description"
          />
        </Box>
      )}
      <Box className={styles.descriptionWrapper}>
        <Box className={styles.label}>Project Description</Box>

        <Input
          // placeholder={'Project Description'}x
          style={{ height: status ? '60px' : '140px' }}
          className={styles.inputField}
          value={dialog_params?.description}
          onChange={(e) => handleChange('description', e.target.value)}
          multiline
          minRows={5}
          label="Description"
        />
      </Box>
      {dialog_params?.create_link && (
        <div className={styles.inputContainer}>
          <Box className={styles.label}>Category</Box>

          <Select
            classes
            className={`${styles.inputField} ${styles.select}`}
            value={dialog_params?.category}
            onChange={(e) => handleChange('category', e.target.value)}
            // displayEmpty
            // inputProps={{ 'aria-label': 'Without label' }}
            MenuProps={MenuProps}
          >
            {/* <MenuItem value="" className={styles.menuItem}>
              <em>None</em>
            </MenuItem> */}
            {case_categories.map((item, k) => (
              <MenuItem className={styles.menuItem} key={k} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}
    </Box>
  );
};

const CloneProject = ({
  variant = 'contained',
  project = {},
  style = {},
  create_new = false,
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleOpenDialog = () => {
    dispatch(clearCloneProject());
    dispatch(
      showDialog({
        options: {
          title: create_new ? 'New Project' : 'Clone Project',
          yes_button: {
            text: 'Submit',
            onClick: () =>
              dispatch(create_new ? createProject() : cloneProject()),
          },
          no_button: { text: 'Cancel', onClick: () => dispatch(hideDialog()) },
          component: () => CloneProjectDialog(create_new),
          no_hide_with_yes: true,
          size: 'medium',
        },
        params: {
          name: project?.name,
          description: project?.overview,
          clone_link: project?._links?.clone_case,
          create_link: create_new,
        },
      })
    );
  };

  return (
    <>
      <Button
        onClick={handleOpenDialog}
        variant={variant}
        className={styles.button}
        style={style}
      >
        {create_new ? (
          <>
            <AddIcon />
            New Project
          </>
        ) : (
          <>Clone</>
        )}
      </Button>
    </>
  );
};

export default CloneProject;
