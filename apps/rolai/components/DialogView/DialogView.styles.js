import { makeStyles } from '@mui/styles';

export const DIALOG_WIDTH_SMALL = 420;
export const DIALOG_WIDTH_MEDIUM = 720;
export const DIALOG_WIDTH_LARGE = 1080;

const useStyles = makeStyles((theme) => ({
  root: {
    '&.small-dialog': {
      '& > .MuiDialog-container >.MuiPaper-root': {
        width: DIALOG_WIDTH_SMALL,
      },
    },
    '&.medium-dialog': {
      '& >.MuiDialog-container >.MuiPaper-root': {
        width: DIALOG_WIDTH_MEDIUM,
      },
    },
    '&.large-dialog': {
      '& > .MuiDialog-container >.MuiPaper-root': {
        width: DIALOG_WIDTH_LARGE,
      },
    },
    '& .MuiPaper-root': {
      borderRadius: 25,
      padding: theme.spacing(1),
    },
    '& .MuiDialogTitle-root': {
      padding: theme.spacing(2.5),
      '& h1': {
        fontSize: 20,
      },
    },
    '& .MuiDialogContent-root': {
      borderBottom: '1px solid #EEF0F8',

      position: 'relative',
      '& #console-actions': {
        display: 'none',
      },
    },
  },
  headerTitleBtn: {
    position: 'absolute',
    top: '23px',
    right: '70px',
  },
  dialogActionsContainer: {
    padding: theme.spacing(2.5),
    justifyContent: 'space-between',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  closeIconImage: {
    cursor: 'pointer',
  },
  fullScreen: {
    '& > .MuiDialog-container': {
      '& > .MuiPaper-root': {
        minHeight: 'calc(100vh - 160px) !important',
        minWidth: 'calc(100vw - 160px) !important',
        maxHeight: 'calc(100vh - 160px) !important',
        maxWidth: 'calc(100vw - 160px) !important',
      },
    },
  },
}));

export default useStyles;
