import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  quiz: {
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    color: 'black',
    minHeight: '100%',
  },
  quiz_title_section: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 2.5),
  },
  quiz_title_text: {
    width: 510,
    height: 28,
    lineClamp: 1,
    fontWeight: '500',
    display: '-webkit-box',
    boxOrient: 'vertical',
    wordBreak: 'break-word',
    overflow: 'hidden',
    paddingRight: theme.spacing(1),
  },
  quiz_questions_block: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    background: '#F8FAFF',
    padding: theme.spacing(5, 4),
    minHeight: '100%',
  },
  quiz_questions: {
    padding: theme.spacing(4),
    border: '1px solid #EBEEF1',
    borderRadius: 15,
    background: 'white',
    width: 864,
  },
  quiz__header_info_wrapper: {
    padding: theme.spacing(1, 0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quiz__title: {
    fontSize: 24,
    fontWeight: 300,
  },
  total_points: {
    fontSize: 12,
    fontWeight: 'normal',
    color: 'rgba(0,0,0,0.7)',
    paddingLeft: theme.spacing(1),
  },
  total_points_count: {
    fontSize: 12,
    fontWeight: 400,
  },
  timeContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: theme.spacing(0, 4),
  },
  clockWrapper: {
    width: 40,
    height: 40,
    borderRadius: 7,
    background: '#F1F3FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expand_button: {
    cursor: 'pointer',
    minWidth: 40,
    height: 40,
    borderRadius: 50,
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #5064E3',
  },
  userScore:{
    color:'green',
  },
  attempts:{
    margin: theme.spacing(0,1)
  },
  scoreSection:{
    display:'flex',
    alignItems:'center',
  }
}));

export default useStyles;
