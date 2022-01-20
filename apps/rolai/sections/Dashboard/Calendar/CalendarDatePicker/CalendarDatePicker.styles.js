import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  calendarPicker: {},
  dateNavigation: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  block: {
    height: 30,
    width: 'calc(100%/7)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& span': {
      padding: 5,
      width: 18,
      height: 18,
      borderRadius: 20,

      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        background: '#00000011',
      },
    },
  },
  days: {
    marginTop: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& $block': {
      fontSize: 10,
      color: '#919191',
    },
  },
  selectedDate: {
    '& span': {
      background: theme.palette.secondary.main,
    },
  },
  dates: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '& $block': {
      fontSize: 9,
      cursor: 'pointer',
    },
  },
}));

export default useStyles;
