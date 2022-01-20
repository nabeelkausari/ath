import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  questionNumber: {
    width: 23,
    height: 23,
    fontSize: 14,
    fontWeight: 500,
    borderRadius: 50,
    background: '#EEF2F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(2),
  },
  question_wrapper: {
    padding: theme.spacing(2.5, 0),
  },
  question__title_wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  question__title: {
    flex: 1,
    display: 'flex',
    paddingBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
  },

  question: {
    flex: 1,
    fontSize: 14,
    fontWeight: 500,
    '& p':{
      marginTop: theme.spacing(0),
    }
  },
  question__marks: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: 'normal',
    marginBottom: 31,
  },
  question__options_wrapper: {
    marginLeft: theme.spacing(4.5),
    borderRadius: 15,
    background: '#F8FAFF',
    padding: theme.spacing(2.5),
  },
}));

export default useStyles;
