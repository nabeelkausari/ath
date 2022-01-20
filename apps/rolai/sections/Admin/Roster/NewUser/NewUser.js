import { Box } from '@mui/system';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllResources,
  setRosterUser,
} from '../../../../store/admin/roster/actions';
import Input from '../../../Admin/Components/Input/Input';
import { Search, StatusBar } from '../../Components/Common/Common';
import Select from '../../Components/Select/Select';
import TabsComponent from '../../Components/TabsComponent/TabsComponent';
import Image from 'next/image';
import useStyles from './NewUser.styles';
import { deleteIcon } from '../../../../assets/Dashboard/Calendar';
import { Popover, Typography } from '@mui/material';
import { capitalize } from '../../../../utils/helpers/helperFunctions';

const tabs = [
  { label: 'Courses', value: 1, param: 'courses' },
  { label: 'Learning Tracks', value: 2, param: 'tracks' },
  { label: 'Projects ', value: 3, param: 'cases' },
];

const NewUser = ({ edit, editUserData }) => {
  const styles = useStyles();
  const [type, setType] = useState(tabs[0]);
  const [allResources, setAllResources] = useState({});
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const { my_profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );
  const { resources, user, access_levels } = useSelector(
    (state) => state.admin.roster
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getAllResources(user.id));
    }
  }, [my_profile_succeeded]);

  const setUser = (data) => {
    dispatch(setRosterUser(data));
  };
  useEffect(() => {
    if (resources) {
      setAllResources(resources);
    }
  }, [resources]);

  useEffect(() => {
    if (allResources) {
      let data = {};
      Object.keys(allResources).map(
        (i, k) =>
          (data['enrol' + capitalize(i)] = allResources[i]
            .filter((i) => i.enrolStatus == 'ENROLLED')
            .map((i) => i.id))
      );
      setUser({ ...data });
    }
  }, [allResources]);

  useEffect(() => {
    if (editUserData)
      setUser({ ...editUserData, roles: [editUserData.roles[0]] });
  }, [editUserData]);

  const changeStatus = (param, id, status) => {
    setAllResources({
      ...allResources,
      [param]: allResources[param].map((i) =>
        i.id === id ? { ...i, enrolStatus: status } : i
      ),
    });
  };
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box className={styles.parent}>
      <Box className={styles.left}>
        <Input
          label="Name"
          boxClass={styles.boxClass}
          value={user.name}
          onChange={(e) => setUser({ name: e.target.value })}
        />
        <Input
          label="Title"
          boxClass={styles.boxClass}
          value={user.designation}
          onChange={(e) => setUser({ designation: e.target.value })}
        />
        <Input
          label="Email"
          boxClass={styles.boxClass}
          value={user.email}
          onChange={(e) => setUser({ email: e.target.value })}
        />
        {!edit && (
          <Input
            label="Password"
            boxClass={styles.boxClass}
            value={user.password}
            onChange={(e) => setUser({ password: e.target.value })}
          />
        )}
        <Select
          label={'Access Control'}
          boxClass={styles.boxClass}
          value={
            access_levels.find((i) => i.label == user.roles && user.roles[0])
              ?.value
          }
          items={access_levels}
          onChange={(value) => setUser({ roles: [value] })}
        />
        <StatusBar
          boxClass={styles.boxClass}
          status={user.status}
          handleChange={(val) => setUser({ status: val })}
        />
        {edit && (
          <Box className={styles.reset}>
            Reset Paswword
            <Box
              marginLeft="5px"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              <Image src={deleteIcon} width={13} />
            </Box>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none',
              }}
              open={anchorEl}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              classes={{ paper: styles.paper }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Box>
                The user will receive a link on registered email to create a new
                password.
              </Box>
            </Popover>
          </Box>
        )}
      </Box>
      <Box className={styles.right}>
        <Wrapper title="Select content for Enrollment">
          <Box margin="0 5px">
            <TabsComponent
              tabs={tabs}
              handleChange={setType}
              selectedTab={type}
            />
          </Box>
          <Box margin="5px 5px">
            <Search
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </Box>
          <Box className={styles.scrollList}>
            {allResources &&
              getStatusData(allResources[type.param], 'NOT_ENROLLED')?.map(
                (item, k) => {
                  if (
                    item.name.toLowerCase().includes(searchText.toLowerCase())
                  )
                    return (
                      <Box
                        key={k}
                        onClick={() =>
                          changeStatus(type.param, item.id, 'ENROLLED')
                        }
                      >
                        {item.name}
                      </Box>
                    );
                  else return null;
                }
              )}
          </Box>
        </Wrapper>
        <Wrapper title="Selected content for Enrollment">
          <Box className={styles.rightScrollList}>
            <ContentBlock
              heading="Courses"
              items={allResources.courses}
              changeStatus={(id) => changeStatus('courses', id, 'NOT_ENROLLED')}
            />
            <ContentBlock
              heading="Learning Tracks"
              items={allResources.tracks}
              changeStatus={(id) => changeStatus('tracks', id, 'NOT_ENROLLED')}
            />
            <ContentBlock
              heading="Projects"
              items={allResources.cases}
              changeStatus={(id) => changeStatus('cases', id, 'NOT_ENROLLED')}
            />
          </Box>
        </Wrapper>
      </Box>
    </Box>
  );
};

export default NewUser;

const getStatusData = (arr = [], status) => {
  return arr.filter((i) => i.enrolStatus === status);
};

const ContentBlock = ({ heading, items = [], changeStatus }) => {
  const styles = useStyles();

  const enrolled = getStatusData(items, 'ENROLLED');
  return (
    <Box>
      <Box className={styles.heading}>
        {heading} ({enrolled?.length})
      </Box>
      <Box className={styles.items}>
        {enrolled.map((item, k) => (
          <Box key={k} onClick={() => changeStatus(item.id)}>
            {item.name}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const Wrapper = ({ title, children }) => {
  const styles = useStyles();

  return (
    <Box className={styles.wrapper}>
      <Box marginBottom={1.5}>{title}</Box>
      <Box className={styles.block}>{children}</Box>
    </Box>
  );
};
