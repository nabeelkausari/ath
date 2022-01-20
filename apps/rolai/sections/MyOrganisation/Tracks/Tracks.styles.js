import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 340,
    borderRadius: 15,
    padding: '5px 5px 10px',
    margin: theme.spacing(2, 1),
    boxShadow: '0px 4px 5px #153B7D14',
  },
  listCount: {
    background: '#EEF0F8',
    borderRadius: 10,
    padding: theme.spacing(0, 1.3),
  },
  highlights: {
    fontSize: 13,
    display: 'flex',
    alignItems: 'center',
    marginLeft: 15,
  },
  header: {
    width: '80%',
    height: '28px',
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 1,
    wordBreak: 'break-word',
    overflow: 'hidden',
    fontWeight: '500',
    paddingRight: theme.spacing(1),
  },
  viewAll: {
    fontSize: 12,
  },
  sectionHeader: {
    fontWeight: '400',
  },
  viewIcons: {
    minWidth: 'auto',
    background: 'white',
    padding: theme.spacing(0),
    border: '1px solid #EAECF1',
  },
  smallIcon: {
    fontSize: 20,
    color: '#000000',
    opacity: 1,
    padding: theme.spacing(0.5),
  },
  description: {
    paddingTop: theme.spacing(0.5),
    height: '100px',
  },
  content: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 4,
    wordBreak: 'break-word',
    overflow: 'hidden',
  },
  title: {
    fontSize: '1rem',
  },
  enrolled: {
    color: theme.palette.success.main,
    display: 'flex',
    alignItems: 'baseline',
    width: '28%',
    justifyContent: 'space-between',
  },
  enrolledIcon: {
    width: '12px',
    height: '12px',
    marginRight: theme.spacing(1),
  },
  courseIcon: {
    width: '16px',
    height: '14px',
    marginRight: theme.spacing(0.5),
  },
  trackActions: {
    padding: theme.spacing(1, 2),
    '& button': {
      marginRight: 10,
    },
    '& a': {
      marginRight: 10,
    },
  },
  cardButtons: {
    // minWidth: 129,
  },
}));

export default useStyles;
