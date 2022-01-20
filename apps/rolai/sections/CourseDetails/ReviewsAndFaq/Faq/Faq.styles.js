import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  Faq: {},
  root: {
    minHeight: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(4, 0),
    boxShadow: '0px 0px 0px #153B7D0F',
    borderRadius: 15,
    border: '1px solid #E0E3E9',
    '& .MuiCardContent-root:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(4)
  },
  rightArrowBtn: {
    width: 20,
    minWidth: 35,
    height: 40,
    borderRadius: '50%',
  },
  rightArrowBtnIcon: {
    width: 15,
    height: 15,
  },
  showMore: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default useStyles;
