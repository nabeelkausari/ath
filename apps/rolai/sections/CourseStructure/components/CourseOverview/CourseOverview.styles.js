import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  courseOverview: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(10),
    height: 'fit-content',
  },
  overviewSubTitle: {
    color: 'rgba(0,0,0,.7)',
  },
  lessonWrapper: {
    minWidth: 500,
    maxWidth: 800,
    borderRadius: 15,
    padding: theme.spacing(2),
    border: '1px solid #EBEEF1',
    overflow: 'auto',
    boxShadow: 'none !important',
    margin: theme.spacing(1.5, 0),
    '& .MuiCardContent-root:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  moduleSequenceWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moduleSequence: {
    minWidth: 80,
    fontSize: '14px !important',
    borderRadius: 50,
    background: '#F8F9FB !important',
    color: 'rgba(0,0,0,.7) !important',
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  accordion: {
    boxShadow: 'none',
    '&:before': {
      background: 'none',
    },
    '& .MuiAccordionSummary-root': {
      minHeight: 30,
    },
  },
  accSummary: {
    padding: 0,
    '& .MuiAccordionSummary-content': {
      display: 'block',
      margin: 0,
    },
  },
  details: {
    borderTop: '1px solid #EBEEF1',
    padding: theme.spacing(0, 1),
    marginTop: theme.spacing(4),
  },
  content: {
    borderTop: '1px solid #F0F0F0',
  },
  lessonsCount: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(3),
  },
  viewButton: {
    fontSize: 12,
    fontWeight: '400 !important',
    alignSelf: 'end',
    padding: theme.spacing(0, 2.5),
  },
  contentCountWrapper: {
    paddingBottom: theme.spacing(0),
  },
}));

export default useStyles;
