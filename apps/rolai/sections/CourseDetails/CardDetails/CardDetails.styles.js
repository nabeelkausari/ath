import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  contentBlock: {
    width: '66%',
  },
  cardTitle: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: '28px !important',
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
  },
  courseStatus: {
    alignItems: 'center',
  },
  reviewDetails: {
    color: theme.palette.primary.main,
    paddingRight: theme.spacing(1),
  },
  rating: {
    paddingRight: theme.spacing(1),
    marginLeft: 15,
  },
  learnText: {
    fontSize: 14,
    fontWeight: 500,
    marginTop: 15,
  },
  root: {
    borderRadius: 15,
    marginBottom: 20,
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
  level: {
    marginRight: theme.spacing(1),
  },
  contentCount: {
    marginLeft: 15,
  },
  contentCountTrack: {
    marginBottom: 25,
  },
}));

export default useStyles;
