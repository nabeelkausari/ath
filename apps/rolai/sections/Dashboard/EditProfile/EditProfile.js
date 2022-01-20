import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { Component, useEffect, useState } from 'react';

import Image from 'next/image';
import useStyles from './EditProfile.styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeUserPassword,
  getAdminProfile,
  getCities,
  updateAdminProfile,
  updateUserProfile,
  updateUserProfileImage,
} from '../../../store/admin/actions';
import { editIcon } from '../../../assets/Dashboard/Calendar';
import { ActionComp } from '../Inbox/CommonComponents/CommonComponents';
import CustomInput from '../../Admin/Components/Input/Input';
import { CalendarInput } from '../Calendar/CreateEvent/CreateEvent';
import moment from 'moment';
import { Label } from '../../Admin/Components/Common/Common';
import SelectComp from '../../Admin/Components/Select/Select';
import {
  clearDialogParams,
  setDialogOptions,
  setDialogParams,
  showDialog,
} from '../../../store/global/actions';
import Async from 'react-select/async';
import { eyeIco } from '../../../assets/Admin';
import { avatarIco } from '../../../assets/icons';

const GENDERITEMS = [
  { label: 'Preferred not to say', value: 'PREFER_NOT_TO_SAY' },
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Other', value: 'OTHERS' },
];
const EditProfile = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { my_profile: profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );
  const { dialog_params } = useSelector((state) => state.global);

  const { cities } = useSelector((state) => state.admin);
  const [data, setData] = useState({});

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getAdminProfile());
    }
  }, [my_profile_succeeded]);

  useEffect(() => {
    setData(profile || {});
  }, [profile]);

  const update = (obj) => {
    setData({ ...data, ...obj });
  };
  const save = () => {
    dispatch(updateUserProfile(data));
  };
  const cancel = () => {
    setData({ ...profile });
  };
  const handleImageUpload = (e) => {
    e.preventDefault();
    let file = e.target.files[0];

    if (file) dispatch(updateUserProfileImage(file));
  };

  const loadOptions = (query, callback) => {
    dispatch(getCities(query, callback));
  };
  const handlePassword = () => {
    dispatch(
      showDialog({
        options: {
          // fullScreen: true,
          // size: 'large',
          // className: commonStyles.rosterUserDailog,
          title: 'Change Password',
          component: PasswordChange,
          yes_button: {
            text: 'Submit',

            onClick: () => {
              dispatch(changeUserPassword());
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
      <Box className={styles.body}>
        <Box className={styles.upload}>
          {
            <Image
              src={
                data?.profile_pic_url
                  ? 'https:' + data.profile_pic_url
                  : avatarIco
              }
              height={80}
              width={80}
              layout="responsive"
            />
          }

          <label className={styles.edit} htmlFor="profile_pic_input">
            <Image src={editIcon} />
          </label>
          <input
            id="profile_pic_input"
            type="file"
            accept=".png, .jpg, .jpeg, .gif"
            className={styles.uploadInput}
            onChange={handleImageUpload}
          />
        </Box>
        <CustomInput
          value={data.name}
          onChange={(e) => update({ name: e.target.value })}
          boxClass={styles.inputWrapper}
          label={'Full Name'}
        />
        <CustomInput
          value={data.email_id}
          disabled
          // onChange={(e) => update({ email: e.target.value })}
          boxClass={styles.inputWrapper}
          label={'Email'}
        />
        <CustomInput
          value={data.phone || ''}
          onChange={(e) => {
            if (e.target.value.match('^[0-9]*$'))
              update({ phone: e.target.value });
          }}
          boxClass={styles.inputWrapper}
          label={'Phone Number'}
        />
        <Box className={styles.inputWrapper}>
          <Label label="Location" />
          <Async
            onChange={(option) =>
              update({ city_id: option.value, city: option })
            }
            classNamePrefix="city-select"
            className={styles.city}
            value={
              data.city && {
                value: data.city.value || data.city.id,
                label:
                  data.city.label ||
                  `${data.city.name}, ${data.city.state}, ${data.city.country}`,
              }
            }
            loadOptions={loadOptions}
            placeholder={'Search'}
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className={styles.inputWrapper}
        >
          <Box className={styles.date}>
            <CalendarInput
              value={data.dob && moment(data.dob, 'yyyy-MM-DD')}
              onChange={(val) => update({ dob: val.format('yyyy-MM-DD') })}
              yearNavigation
              maxDate={moment()}
              LabelComp={() => <Label label={'Birthday'} />}
              style={{ popup: { width: '245px', marginTop: '0px' } }}
            />
          </Box>
          <SelectComp
            label={'Gender'}
            boxStyle={{ width: '48%' }}
            value={GENDERITEMS.find((i) => i.value == data.gender)?.value}
            onChange={(value) => update({ gender: value })}
            items={GENDERITEMS}
          />
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          minHeight={100}
        >
          <Button
            style={{ padding: 0, fontSize: 13, fontWeight: 400 }}
            onClick={handlePassword}
          >
            Change Password
          </Button>
          <Box>
            {JSON.stringify(profile) !== JSON.stringify(data) && (
              <ActionComp
                nobtn={{ text: 'Cancel', onClick: cancel }}
                yesbtn={{ text: 'Save', onClick: save }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;

const PasswordChange = () => {
  const styles = useStyles();
  const { dialog_params: data = {} } = useSelector((state) => state.global);

  const update = (key, value) => {
    dispatch(setDialogParams({ key, value }));
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearDialogParams());
    return () => {
      dispatch(clearDialogParams());
    };
  }, []);

  return (
    <Box fontSize={13}>
      <CustomInput
        value={data.password}
        onChange={(e) => update('password', e.target.value)}
        boxClass={styles.inputWrapper}
        label={'New Password'}
        placeholder={'Enter New Password'}
        type={data.passwordEye ? 'text' : 'password'}
        valueIcon={
          <Image
            src={eyeIco}
            onClick={() => update('passwordEye', !data.passwordEye)}
          />
        }
      />
      <CustomInput
        value={data.confirmPassword}
        onChange={(e) => update('confirmPassword', e.target.value)}
        boxClass={styles.inputWrapper}
        label={'Re-enter New Password'}
        type={data.rePasswordEye ? 'text' : 'password'}
        placeholder={'Re-enter New Password'}
        valueIcon={
          <Image
            src={eyeIco}
            onClick={() => update('rePasswordEye', !data.rePasswordEye)}
          />
        }
      />
    </Box>
  );
};
