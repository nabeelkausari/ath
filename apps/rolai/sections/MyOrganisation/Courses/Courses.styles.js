import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  courses: {
    padding: theme.spacing(1, 0),
  },
  listCount: {
    background: '#EEF0F8',
    borderRadius: 10,
    padding: theme.spacing(0, 1.3),
  },
  cardList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  root: {
    width: 340,
    borderRadius: 15,
    padding: '5px 5px 10px',
    margin: theme.spacing(2, 1),
    boxShadow: '0px 4px 5px #153B7D14',
  },
  highlights: {
    fontSize: '13px',
  },
  header: {
    width: '80%',
    height: '48px',
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 2,
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
    wordBreak: 'break-all',
    overflow: 'hidden',
  },
  listConatiner: {
    padding: theme.spacing(0.5, 2, 0.8, 2),
  },
  listView: {
    minHeight: 165,
  },
  listItem: {
    alignItems: 'baseline',
    padding: theme.spacing(0.5),
  },
  listIcon: {
    minWidth: 20,
  },
  listText: {
    margin: 0,
  },
  contentHeader: {
    height: '20px',
    fontWeight: '500',
  },
  title: {
    fontSize: '1rem',
  },
  enrolled: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    width: '28%',
    '& > div': {
      marginTop: '3px !important',
    },
  },
  enrolledText: {
    fontSize: 12,
    color: theme.palette.success.main,
    marginLeft: 5,
  },
  reviewBlock: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 15,
  },
  avatar: {
    width: 28,
    height: 28,
    fontSize: 12,
    backgroundColor: theme.palette.primary.main,
  },
  personTitle: {
    fontWeight: 500,
  },
  personSubHeader: {
    fontSize: 12,
  },
  courseActions: {
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
