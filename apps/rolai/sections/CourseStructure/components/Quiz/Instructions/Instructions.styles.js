import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  instructions: {
    color: 'black',
    display: 'flex',
    background: 'white',
    alignItems: 'baseline',
    padding: theme.spacing(3, 5),
  },
  quiz_instructions_block: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: theme.spacing(0, 2),
  },
  quiz_instructions: {
    borderRadius: 15,
    background: '#F8FAFF',
    border: '1px solid #EBEEF1',
    marginTop: theme.spacing(2),
    padding: theme.spacing(3, 4),
  },
  title: {
    fontSize: 24,
    fontWeight: 300,
    display: 'flex',
    alignItems: 'center',
  },
  list: {
    '& .listItem': {
      color: 'rgba(0,0,0,.7)',
    },
  },
  results: {
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    alignItems: 'center',
    padding: theme.spacing(3, 5),
  },
  result_title: {
    fontSize: 24,
    lineHeight: 1.8,
    fontWeight: '500',
    color: alpha(theme.palette.primary.main, 1),
  },
  result_message: {
    fontSize: 16,
    fontWeight: '300',
  },
  result_sub_title: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    fontSize: 14,
    fontWeight: '500',
  },
  view_answers: {
    marginTop: theme.spacing(1),
  },
}));

export default useStyles;
