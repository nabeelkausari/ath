import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import cx from 'classnames';
import React from 'react';

import useStyles from './DialogView.styles';

export default function DialogView({
  yesButton,
  noButton,
  subtitle = '',
  content,
  children,
  sub_subtitle = '',
  hide_header = false,
  hide_footer = false,
  loading = false,
  headerButton,
  is_dialog_open,
  dialog_options,
  hideDialog,
  className,
  no_hide_with_yes = false,
  size = 'small',
  fullScreen = false,
  fullWidth = false,
  LeftActions,
}) {
  const styles = useStyles();
  const buttonCallback = (callback, primary) => {
    if (!callback) return hideDialog();
    if (no_hide_with_yes && primary) {
      return callback();
    } else {
      hideDialog();
      return callback();
    }
  };
  return (
    <Dialog
      onClose={hideDialog}
      aria-labelledby="customized-dialog-title"
      open={is_dialog_open}
      fullWidth={fullWidth}
      className={cx([
        styles.root,
        fullScreen && styles.fullScreen,
        `${size}-dialog`,
      ])}
      classes={{ paper: className }}
    >
      {!hide_header && (
        <DialogTitle>
          <Typography variant="body1" component="div">
            <div>
              {!!dialog_options?.title && (
                <Typography variant="h5" component="h1">
                  {dialog_options.title}
                </Typography>
              )}
              {!!subtitle && (
                <Typography variant="subtitle1" component="h2">
                  {subtitle}
                </Typography>
              )}
              {!!sub_subtitle && (
                <Typography component="h6">{sub_subtitle}</Typography>
              )}
            </div>
          </Typography>
          {/* {onClose ? ( */}

          {!!headerButton && (
            <Button
              variant="text"
              className={styles.headerTitleBtn}
              onClick={() => buttonCallback(headerButton.onClick)}
            >
              {headerButton.text}
            </Button>
          )}
          <Box
            className={styles.loginRightPanelConatiner}
            position="absolute"
            top={30}
            right={40}
          >
            <CloseIcon onClick={hideDialog} className={styles.closeIconImage} />
          </Box>
        </DialogTitle>
      )}

      {content && (
        <DialogContent>
          <p>{content}</p>
        </DialogContent>
      )}
      {children && <DialogContent>{children}</DialogContent>}
      {!hide_footer && (!!yesButton || !!noButton) && (
        <DialogActions className={styles.dialogActionsContainer}>
          {LeftActions ? <LeftActions></LeftActions> : <Box></Box>}
          <Box>
            {!!noButton && (
              <Button
                variant="text"
                size="md"
                style={{ height: 40 }}
                onClick={() => buttonCallback(noButton.onClick)}
              >
                {noButton.text || 'No'}
              </Button>
            )}
            {!!yesButton && (
              <LoadingButton
                type="submit"
                loading={loading}
                style={{ height: 40, marginLeft: 10 }}
                disabled={yesButton.disabled}
                variant="contained"
                size="md"
                onClick={() => buttonCallback(yesButton.onClick, true)}
              >
                {yesButton.text || 'Yes'}
              </LoadingButton>
            )}
          </Box>
        </DialogActions>
      )}
    </Dialog>
  );
}
