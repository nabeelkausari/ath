import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  projects: {
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
  chip: {
    fontSize: 11,
    padding: '4px 8px !important',
    borderRadius: 20,
  },
  readOnly: {
    color: theme.palette.yellow.main,
    backgroundColor: theme.palette.yellow.secondary,
  },
  shared: {
    color: theme.palette.green.main,
    backgroundColor: theme.palette.green.secondary,
  },
  myProject: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
  },
  chipRoot: {
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    minHeight: '40px',
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 2,
    wordBreak: 'break-word',
    overflow: 'hidden',
    fontWeight: '500',
    lineHeight: '20px',
  },
  viewAllBox: {
    // width: '13%',
  },
  sectionHeader: {
    fontWeight: '400',
  },
  viewAll: {
    color: theme.palette.primary.main,
    fontSize: 12,
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
  cardHeader: { padding: theme.spacing(1) },
  description: {
    paddingTop: theme.spacing(0.5),
    height: '100px',
  },
  contentBox: {
    paddingTop: 0,
  },
  content: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 5,
    wordBreak: 'break-word',
    overflow: 'hidden',
    minHeight: 100,
    paddingTop: 0,
  },
  title: {
    fontSize: '1rem',
  },
  enrolled: {
    height: 35,
    color: theme.palette.success.main,
    textAlign: 'right',
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  enrolledIcon: {
    width: '12px',
    height: '12px',
    marginRight: theme.spacing(1),
  },
  projectActions: {
    padding: theme.spacing(1, 2),
    '& button': {
      marginRight: 10,
    },
    '& a': {
      marginRight: 10,
    },
  },
  cardButtons: {},
}));

export default useStyles;
