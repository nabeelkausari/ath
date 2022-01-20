import { makeStyles } from '@mui/styles';
import { PALETTE_YELLOW_MAIN } from "../../../../config/theme";

const useStyles = makeStyles((theme) => ({
  lessonHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(4),
  },
  clockWrapper: {
    minWidth: 40,
    height: 40,
    borderRadius: 7,
    background: '#F1F3FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lesson_header: {
    fontWeight: '300',
    // maxWidth: 380,
    maxHeight: 64,
    minHeight: 50,
    lineClamp: 2,
    display: '-webkit-box',
    boxOrient: 'vertical',
    wordBreak: 'break-word',
    overflow: 'hidden',
  },
  lessonTitlewrapper: {
    display: 'flex',
    alignItems: 'self-start',
    // width: '60%',
    flex: 1,
    paddingRight: 20,
  },
  lessonActionWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  primaryBtn: {
    background: 'red',
  },
  actionsBtn: {
    cursor: 'pointer',
    padding: theme.spacing(0, 0.6),
    '&:first-child': {
      paddingLeft: theme.spacing(0),
    },
    '&:last-child': {
      paddingRight: theme.spacing(0),
    },
  },
  notesWrapper: {
    display: 'flex',
    position: 'relative',
  },
  notesCount: {
    position: 'absolute',
    top: -3,
    right: -1,
    width: 17,
    height: 17,
    fontSize: 10,
    color: 'white',
    borderRadius: 50,
    background: PALETTE_YELLOW_MAIN,
    textAlign: 'center',
  },
  contentIcons: {
    height: 16,
    display: 'flex',
    padding: theme.spacing(0, 1),
    borderRight: '1px solid #CFDCE8',
    '&:first-child': {
      paddingLeft: theme.spacing(0),
    },
    '&:last-child': {
      borderRight: '0',
    },
  },
  contentIconsContainer: {
    display: 'flex',
  },
  milestoneCount: {
    fontSize: '10px !important',
    color: 'black !important',
  },
  lessonStatus: {
    width: 14,
    height: 14,
    borderRadius: 50,
    border: '1px dashed #9FA8A5',
  },
  milestone__divider: {},
  divider: {},
  milestoneProgress: {
    padding: theme.spacing(0, 6, 2.5, 6),
  },
  markAsDone: {
    textTransform: 'none',
    padding: theme.spacing(1, 2),
  },
}));

export default useStyles;
