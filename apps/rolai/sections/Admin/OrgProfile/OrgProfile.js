import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { Component, useEffect, useState } from 'react';
import CustomInput from '../Components/Input/Input';
import Image from 'next/image';
import useStyles from './OrgProfile.styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAdminProfile,
  updateAdminProfile,
  updateAdminProfileImage,
} from '../../../store/admin/actions';
import { editIcon } from '../../../assets/Dashboard/Calendar';
import { ActionComp } from '../../Dashboard/Inbox/CommonComponents/CommonComponents';

const OrgProfile = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { my_profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );
  const { profile } = useSelector((state) => state.admin);
  const [data, setData] = useState({});
  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getAdminProfile());
    }
  }, [my_profile_succeeded]);

  useEffect(() => {
    setData(profile);
  }, [profile]);

  const update = (obj) => {
    setData({ ...data, ...obj });
  };
  const save = () => {
    dispatch(updateAdminProfile(data));
  };
  const cancel = () => {
    setData({ ...profile });
  };
  const handleImageUpload = (e) => {
    e.preventDefault();
    let file = e.target.files[0];

    if (file) dispatch(updateAdminProfileImage(file));
  };
  return (
    <Box className={styles.parent}>
      <Box className={styles.body}>
        <Box className={styles.upload}>
          {data?.logoUrl && (
            <Image
              src={'https:' + data.logoUrl}
              height={108}
              width={380}
              layout="responsive"
            />
          )}

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
          value={data.tenantName}
          onChange={(e) => update({ tenantName: e.target.value })}
          boxClass={styles.inputWrapper}
          label={'Organization Name'}
        />
        <CustomInput
          value={data.email}
          onChange={(e) => update({ email: e.target.value })}
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
        <CustomInput
          value={data.about}
          onChange={(e) => update({ about: e.target.value })}
          boxClass={styles.inputWrapper}
          label={'About Organization'}
          multiline
        />
        <CustomInput
          value={data.website}
          onChange={(e) => update({ website: e.target.value })}
          boxClass={styles.inputWrapper}
          label={'Website'}
        />
        {JSON.stringify(profile) !== JSON.stringify(data) && (
          <ActionComp
            nobtn={{ text: 'Cancel', onClick: cancel }}
            yesbtn={{ text: 'Save', onClick: save }}
          />
        )}
      </Box>
    </Box>
  );
};

export default OrgProfile;
