import { Tooltip } from '@mui/material';
import React, { useState } from 'react';

import { getInitials } from '../../utils/helpers/helperFunctions';

const Avatar = ({ user }) => {
  const [showName, setShowName] = useState(false);
  if (user?.profile_pic_url) {
    return (
      <img
        className="comment-card__profile-pic"
        src={user.profile_pic_url}
        alt=""
      />
    );
  } else {
    return (
      <Tooltip title={user.name} placement="top">
        <div className="comment-card__initials">{getInitials(user.name)}</div>
      </Tooltip>
    );
  }
};

export default Avatar;
