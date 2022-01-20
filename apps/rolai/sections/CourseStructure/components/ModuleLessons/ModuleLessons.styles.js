import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  lessons: {},
  lessonsContainer: {
    borderLeft: '1px dashed #E0E8F1',
    marginLeft: theme.spacing(0.4),
    paddingTop: theme.spacing(4),
  },
  lessonsWrapper: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'flex-start',
    borderTop: '1px solid #EBEEF1',
    padding: theme.spacing(1.5, 2),
    borderLeft: '4px solid transparent',
    '&:last-child': {
      borderBottom: '1px solid #EBEEF1',
    },
    '&:hover': {
      background: '#FAFBFF',
    },
  },
  active: {
    borderLeft: `4px solid ${theme.palette.highlight.main}`,
  },
  lessonTitleContainer: {
    flex: 1,
    margin: `${theme.spacing(0, 1)} !important`,
  },
  lessonsIcon: {},
  lessonsTitle: {
    fontSize: 14,
    lineClamp: 2,
    overflow: 'hidden',
    boxOrient: 'vertical',
    display: '-webkit-box',
    wordBreak: 'break-word',
  },
  lessonStatus: {
    width: 15,
    height: 15,
    borderRadius: 50,
    border: '1px dashed #9FA8A5',
  },
  selectedTitle: {
    fontWeight: 600,
  },
}));

export default useStyles;
