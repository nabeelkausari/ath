import { Box } from '@mui/system';
import React, { Component } from 'react';

import useStyles from './RosterBar.styles';
import Input from '../../../Admin/Components/Input/Input';
import { Button } from '@mui/material';
import Select from '../../Components/Select/Select';
import AddIcon from '@mui/icons-material/Add';
import { StatusBar } from '../../Components/Common/Common';
import { useDispatch, useSelector } from 'react-redux';
import {
  createRosterUser,
  setRosterFilter,
} from '../../../../store/admin/roster/actions';
import { showDialog } from '../../../../store/global/actions';
import NewUser from '../NewUser/NewUser';
import { useCommonStyles } from '../../Components/Common/Common.styles';

const RosterBar = () => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();

  const { filter, designations, access_levels, user } = useSelector(
    (state) => state.admin.roster
  );

  const setFilter = (data) => {
    dispatch(setRosterFilter(data));
  };

  const handleNewUser = () => {
    dispatch(
      showDialog({
        options: {
          // fullScreen: true,
          size: 'large',
          className: commonStyles.rosterUserDailog,
          title: 'New User',
          component: NewUser,
          yes_button: {
            text: 'Create',

            onClick: () => {
              console.log(user);
              dispatch(createRosterUser());
            },
          },
          no_button: {
            text: 'Cancel',
          },
          no_hide_with_yes: true,
        },
      })
    );
  };

  return (
    <Box className={styles.parent}>
      <Box className={styles.inputs}>
        <Input
          label={'Name'}
          boxClass={styles.input}
          value={filter.name}
          debounce
          boxStyle={{ width: '265px' }}
          onChange={(e) => setFilter({ name: e.target.value })}
        />

        <Select
          label={'Designation'}
          boxClass={styles.input}
          value={filter.designation}
          items={designations}
          all
          onChange={(value) => setFilter({ designation: value })}
        />
        <StatusBar
          boxClass={styles.input}
          status={filter.status}
          handleChange={(val) =>
            setFilter({ status: filter.status == val ? undefined : val })
          }
        />
        <Select
          label={'Access Level'}
          boxClass={styles.input}
          items={access_levels}
          value={filter.accessLevel}
          all
          onChange={(value) => setFilter({ accessLevel: value })}
        />
      </Box>
      <Box>
        <Button
          onClick={(e) => {
            handleNewUser();
            e.stopPropagation();
          }}
          variant={'contained'}
          className={styles.create}
          // style={style}
        >
          <>
            <AddIcon style={{ marginRight: 5 }} />
            New
          </>
        </Button>
      </Box>
    </Box>
  );
};

export default RosterBar;
