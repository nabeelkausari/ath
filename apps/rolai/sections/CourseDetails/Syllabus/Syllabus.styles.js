import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  syllabus: {},
  root: {
    borderRadius: 15,
    margin: theme.spacing(2, 0),
    boxShadow: '0px 5px 25px #153B7D0F',
    '& .MuiCardContent-root:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    width: 170,
    height: 135,
    borderRadius: 24,
    background: '#F8F9FB',
    padding: theme.spacing(2),
  },
  rightArrowBtn: {
    minWidth: 35,
    height: 40,
    borderRadius: '50%',
  },
  rightArrowBtnIcon: {
    width: 15,
    height: 15,
  },
  syllabusContent: {
    width: '100%',
    padding: theme.spacing(1, 2),
  },
  contentCount: {
    paddingBottom: theme.spacing(1),
  },
}));

export default useStyles;
