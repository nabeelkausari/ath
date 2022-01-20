import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import {
  COURSE_STRUCTURE_NAVBAR_HEIGHT,
  NAVBAR_HEIGHT,
} from '../../../../utils/constants/styles';

const useStyles = makeStyles((theme) => ({
  myLibraryContainer: {
    padding: theme.spacing(3),
    background: 'white',
    position: 'relative',
    minHeight: `calc(100vh - ${
      NAVBAR_HEIGHT + COURSE_STRUCTURE_NAVBAR_HEIGHT + 40
    }px)`,
  },
  buttonGroup: {
    margin: theme.spacing(2, 0),
    position: 'fixed',
    '& .MuiButton-root': {
      color: '#000',
      fontWeight: 'normal',
      backgroundColor: '#FAFBFC',
    },
  },
  noteActions: {
    position: 'absolute',
    display: 'none',
    justifyContent: 'space-between',
    width: 65,
    top: 0,
    right: 0,
    padding: 10,
    '& >div': {
      cursor: 'pointer',
    },
  },
  buttonGroupChip: {
    marginLeft: theme.spacing(1),
    backgroundColor: '#EEF4F9',
    height: 17,
    '& span': {
      fontSize: 11,
      fontWeight: 'bold',
      lineHeight: '13px',
      padding: theme.spacing(0.5),
    },
  },
  heading: {
    display: 'flex',
    alignItems: 'baseline',
    marginTop: 15,
    '& h3': {
      margin: `${theme.spacing(0, 1)} !important`,
    },
  },
  items: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  buttonSelected: {
    color: `${alpha(theme.palette.primary.main, 1)} !important`,
    backgroundColor: '#fff !important',
  },
  chipSelected: {
    color: `${alpha(theme.palette.primary.main, 1)} !important`,
  },
  myLibrary: {
    flex: 1,
    display: 'flex',
    alignItems: 'self-start',
  },
  noteListItem: {
    padding: theme.spacing(2),
    cursor: 'pointer',
    borderLeft: '4px solid transparent',
    display: 'flex',
    alignItems: 'flex-start',
  },
  noteListItemSelected: {
    backgroundColor: '#fff',
    borderLeft: '4px solid',
    borderLeftColor: alpha(theme.palette.highlight.main, 1),
  },
  noteListItemIcon: {
    marginRight: theme.spacing(1.5),
  },
  noteListItemTitle: {
    flex: 1,
    fontSize: 14,
  },
  noteListItemTitleSelected: {
    fontWeight: '500',
  },
  leftPanel: {
    minWidth: 392,
    maxWidth: 445,
    borderRadius: 20,
    position: 'sticky',
    backgroundColor: '#F8F9FB',
    // border: '1px solid #EBEEF1',
    top: `${190 + NAVBAR_HEIGHT}px`,
    padding: theme.spacing(2),
  },
  rightPanel: {
    overflow: 'auto',
    borderRadius: 15,
    border: '1px solid #EBEEF1',
    margin: theme.spacing(1, 8),
    padding: theme.spacing(3),
    background: alpha(theme.palette.common.white, 1),
    flex: 1,
  },
  notesLessonTitle: {
    fontWeight: '300',
    fontSize: 24,
    flex: 1,
  },
  notesHeading: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderBottom: '1px solid #F0F0F0',
  },
  notesHeadingIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.spacing(1),
    backgroundColor: '#F1F8FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(1.5),
    alignSelf: 'flex-start',
  },
  input: {
    height: '100px',
    alignItems: 'flex-start',
    overflow: 'auto',
    width: '100%',
    borderRadius: 10,
    background: 'white',

    padding: 10,
    border: '1px solid #B0C0D2',
    textarea: {
      height: '100%',
      background: 'white',
    },
    '&::before': {
      borderBottom: 0,
    },
    '&::after': {
      borderBottom: 0,
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: 0,
    },
  },
  buttonGroupNote: {
    justifyContent: 'flex-end',
    width: '100%',
    display: 'flex',
    marginTop: 10,
  },
  primaryButton: {
    minWidth: 50,
    borderRadius: 50,
    padding: '4px 20px',
  },
  noteItem: {
    padding: theme.spacing(3, 2),
    position: 'relative',
    borderRadius: 10,
    borderBottom: '1px solid #F0F0F0',
    '&:hover': {
      background: '#F1F8FF',
      '& $noteActions': {
        display: 'flex',
      },
    },
  },
  note: {
    paddingRight: theme.spacing(4),
  },
  noteItemBody: {
    fontSize: 14,
    opacity: 0.7,
    whiteSpace: 'pre-line',
  },
  noteItemTime: {
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.7,
    marginTop: theme.spacing(1),
  },
  noteDes: {
    display: 'flex',
    alignItems: 'flex-start',
    // justifyContent: 'space-between',
    '& >div:first-child': {},
    '& >div:last-child': {},
  },

  inputField: {
    width: '100px',
    borderRadius: 10,
    position: 'relative',
    // border: '1px solid #ced4da',
    height: 30,
    // color: 'rgba(0, 0, 0, 0.6)',
    paddingTop: 0,
    fontSize: 13,

    paddingBottom: 0,
    padding: theme.spacing(0.5, 2),
    margin: theme.spacing(1, 0, 0, 0),
    backgroundColor: theme.palette.common.white,
    '&.Mui-error': {
      borderColor: theme.palette.error.main,
    },
    '&::before': {
      borderBottom: 0,
    },
    '&::after': {
      borderBottom: 0,
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: 0,
    },
    // '& div': {
    //   padding: theme.spacing(0.5, 0),
    // },
  },
  descriptionWrapper: {
    '& .MuiInputBase-multiline': {
      height: 60,
      overflow: 'auto !important',

      '& textarea': {
        maxHeight: '100%',
        overflow: 'auto !important',
      },
    },
  },
  select: {
    width: '30%',
    padding: 0,

    $inputField: {
      padding: theme.spacing(0.5, 2),
    },
  },
  menuItem: {
    fontSize: 13,
    padding: '5px 10px',
    minHeight: 20,
  },
}));

export default useStyles;
