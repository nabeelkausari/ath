import Typography from '@mui/material/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideDialog } from '../../store/global/actions';
import DialogView from '../DialogView/DialogView';

const GlobalDialog = () => {
  const dispatch = useDispatch();
  const { is_dialog_open, dialog_options } = useSelector(
    (state) => state.global
  );
  const {
    component: DialogComponent,
    message,
    component_props,
  } = dialog_options || '';

  const handleClose = () => {
    dispatch(hideDialog());
  };
  return (
    <DialogView
      hide_header={dialog_options?.hide_header}
      hide_footer={dialog_options?.hide_footer}
      yesButton={dialog_options?.yes_button}
      no_hide_with_yes={dialog_options?.no_hide_with_yes}
      noButton={dialog_options?.no_button}
      headerButton={dialog_options?.header_button}
      dialog_options={{
        title: dialog_options?.title,
      }}
      className={dialog_options?.className}
      is_dialog_open={is_dialog_open}
      hideDialog={handleClose}
      loading={dialog_options?.submitting}
      fullWidth={dialog_options?.fullWidth}
      size={dialog_options?.size}
      fullScreen={dialog_options?.fullScreen}
      LeftActions={dialog_options.LeftActions}
    >
      {DialogComponent ? (
        <DialogComponent {...component_props} />
      ) : (
        <Typography>{message}</Typography>
      )}
    </DialogView>
  );
};

export default GlobalDialog;
