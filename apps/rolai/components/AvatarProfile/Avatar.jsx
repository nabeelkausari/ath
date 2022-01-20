import { Box } from '@mui/system';
import Image from 'next/image';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { avatarIco } from '../../assets/icons';
import { getUserIdFromProfile } from '../../utils/helpers/storage';

const ProfileAvatar = ({ url, user_id, owner }) => {
  const { all_users } = useSelector((state) => state.collaborators);

  const getPicUrl = (id) =>
    all_users.find((i) => i.mapping_id == id)?.profile_pic_url;

  const getSrc = () => {
    let id = owner ? getUserIdFromProfile() : user_id;
    let picUrl = url || getPicUrl(id);

    return picUrl
      ? picUrl.includes('http')
        ? picUrl
        : 'https:' + picUrl
      : undefined;
  };
  console.log(getSrc());

  return (
    <Box
      sx={{
        height: '35px',
        width: '35px',
        borderRadius: '35px',
        overflow: 'hidden',
      }}
    >
      <Image
        src={getSrc() || avatarIco}
        width={'100%'}
        height={'100%'}
        className="rounded-full"
      />
    </Box>
  );
};

export default ProfileAvatar;
