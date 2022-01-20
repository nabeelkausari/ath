import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  contentBlock: {
    width: '66%',
  },
  cardTitle: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: 28,
  },
  cardList: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  BoxflexWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    // justifyContent: 'space-between',
  },
  reviewDetails: {
    color: theme.palette.primary.main,
    paddingRight: theme.spacing(1),
  },
  rating: {
    paddingRight: theme.spacing(1),
    marginLeft: 12,
  },
  learnText: {
    fontSize: 14,
    fontWeight: 500,
  },
  root: {
    borderRadius: 15,
    padding: theme.spacing(2.1),
    margin: theme.spacing(2, 0),
    boxShadow: '0px 4px 25px #153B7D14',
  },
  rightImage: {
    background: '#F8F9FB',
    borderRadius: 50,
    width: 250,
    height: 250,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  recommendContainer: {
    display: 'flex',
    alignItems: 'end',
    paddingLeft: theme.spacing(2.5),
  },
  recommend: {
    width: '52%',
  },
  description: {
    minHeight: 130,
    lineClamp: 'unset',
    padding: theme.spacing(1, 0),
    fontSize: '16px !important',
    lineHeight: '24px !important',
    marginTop: 10,
  },
  courseCount: {
    alignItems: 'center',
  },
  chip: {
    fontSize: 12,
    padding: '1px 8px !important',
    borderRadius: 20,
    marginRight: 10,
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
    height: '20px !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
}));

export default useStyles;
