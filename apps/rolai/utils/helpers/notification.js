import Alert from '@mui/material/Alert';
import * as React from 'react';
import { toast } from 'react-toastify';

import error_icon from '../../assets/icons/error-icon.svg';
import info_icon from '../../assets/icons/info-icon.svg';
import success_icon from '../../assets/icons/success-icon.svg';
import warning_icon from '../../assets/icons/warning-icon.svg';

const toast_config = {
  draggable: true,
  hideProgressBar: true,
  newestOnTop: true,
  position: toast.POSITION.BOTTOM_LEFT,
};

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return success_icon;
    case 'error':
      return error_icon;
    case 'warning':
      return warning_icon;
    default:
      return info_icon;
  }
};

const NotificationTemplate = (props) => {
  const { title, message, type } = props;
  return (
    <Alert severity={type} sx={{ width: '100%' }}>
      {message ? message : title}
    </Alert>
  );
};

const notifier = (title, message, type) => {
  let msg = typeof message === 'string' ? message : '';
  toast(<NotificationTemplate type={type} title={title} message={msg} />, {
    ...toast_config,
    type: type,
  });
};

export const notify = {
  success: (title, message) => notifier(title, message, 'success'),
  error: (title, message) => title && notifier(title, message, 'error'),
  warning: (title, message) => notifier(title, message, 'warning'),
  info: (title, message) => notifier(title, message, 'info'),
};
