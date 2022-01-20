import { makeStyles } from '@mui/styles';

import {
  PALETTE_BACKGROUND_SECONDARY,
  PALETTE_SECONDARY_LIGHT,
} from '../../../../config/theme';

const useStyles = makeStyles((theme) => ({
  baseCard: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 'calc(100% - 8px)',
    maxWidth: 340,
    width: '100%',
    zIndex: 100,
    borderRadius: theme.spacing(2, 0, 0, 2),
    // padding: theme.spacing(5, 3.6),
    border: '1px solid #EBEEF1',
    // flex: 1,
    marginTop: 8,
    overflow: 'auto',
  },
  header: {
    background: PALETTE_BACKGROUND_SECONDARY,
    padding: 20,
    marginBottom: 10,
  },
  body: {},
  chip: {
    background: '#F1F8FF',
    fontWeight: 'bold',
  },
  input: {
    height: '90px',
    alignItems: 'flex-start',
    overflow: 'auto',
    width: '100%',
    borderRadius: 10,
    padding: '10px !important',
    border: '1px solid #B0C0D2',
    fontSize: '80%',
    background: 'white',
    textarea: {
      height: '100%',
    },
    '&::before': {
      borderBottom: 0,
    },
    '&::after': {
      borderBottom: 0,
    },
    '& ::placeholder': {
      fontStyle: 'italic',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: 0,
    },
  },
  timeAgo: {
    fontStyle: 'italic',
    opacity: '.7',
    fontSize: '70%',
  },
  buttonGroup: {
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 10,
    display: 'flex',
  },
  pointer: {
    cursor: 'pointer',
  },
  primaryButton: {
    minWidth: 50,
    borderRadius: 50,
    padding: '4px 20px',
  },
  noteActions: {
    position: 'absolute',
    display: 'none',
    padding: 10,
    justifyContent: 'space-between',
    top: 0,
    right: 0,
    width: 65,
  },
  noteBody: {
    fontSize: '80%',
    whiteSpace: 'pre-line',
  },
  editNote: {
    padding: theme.spacing(2, 2),
    // paddingRight: theme.spacing(10),
    background: PALETTE_SECONDARY_LIGHT,

    // margin: theme.spacing(0, -3.6),
  },
  divider: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: `calc(100% - ${theme.spacing(13.6)})`,
    margin: theme.spacing(0, 3.6),
  },
  note: {
    position: 'relative',
    minHeight: '70px',

    padding: theme.spacing(1.5, '20px'),
    paddingRight: theme.spacing(10),
    // margin: theme.spacing(0, -3.6),

    '&:hover': {
      background: PALETTE_SECONDARY_LIGHT,
      '& $noteActions': {
        display: 'flex',
      },
      '& hr': {
        display: 'none',
      },
    },

    '&:last-child $divider': {
      display: 'none',
    },
  },
}));

export default useStyles;
