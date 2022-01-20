import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  moduleWrapper: {
    padding: theme.spacing(2.5),
    height: '100%',
    overflow: 'auto',
    '& .MuiCard-root': {
      margin: theme.spacing(1, 0),
      boxShadow: '0px 3px 6px #153B7D14',
      '&:last-child': {
        marginBottom: theme.spacing(8),
      },
    },
  },
  filterPaper: {
    boxShadow: '0px 3px 6px #153b7d14',
  },
  filterBody: {
    '& .MuiPaper-root': {
      padding: theme.spacing(1),
      width: 250,
      maxHeight: 250,
      minHeight: 100,
      borderRadius: 20,
      height: '200px',
      background: 'white',
      '& ul': {
        display: 'flex',

        flexWrap: 'wrap',
        '& div': {
          padding: theme.spacing(0.5, 1.5),
          background: '#F8F9FB',
          borderRadius: 50,
          margin: 3,
          cursor: 'pointer',
          fontSize: '70% !important',
        },
        position: 'absolute',
      },
    },
  },
  filterSelected: {
    background: '#2D43AA !important',
    color: 'white',
  },
  filterHeading: {
    background: 'initial !important',
    paddingLeft: '2px !important',
    width: '100%',
    fontWeight: '600',
  },
  OverviewCard: {
    cursor: 'pointer',
    position: 'relative',
    marginTop: '0 !important',
    '& .MuiCardContent-root': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    '& .MuiCardContent-root:last-child': {
      minHeight: 40,
      padding: 0,
    },
  },
  OverviewCardSelected: {
    borderLeftColor: theme.palette.highlight.main,
    borderLeft: '4px solid',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  moduleProgress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moduleTitle: {
    fontSize: 14,
    lineClamp: 2,
    overflow: 'hidden',
    boxOrient: 'vertical',
    display: '-webkit-box',
    wordBreak: 'break-word',
  },
  lessonsCount: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    '& .MuiButton-root:hover': {
      background: 'white',
    },
  },
  lessonsCountText: {
    margin: theme.spacing(0, 1),
  },
  count: {
    padding: 0,
  },
  viewIcons: {
    padding: '0 !important',
    minWidth: '23px !important',
    height: 23,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#F1F8FF !important',
    border: '1px solid #EAECF1',
    transition: '.3s',
  },
  smallIcon: {
    fontSize: '18px !important',
    color: '#000000',
    opacity: 1,
    padding: theme.spacing(0.5),
  },
  expandIcon: {
    transform: 'rotate(90deg)',
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
    padding: theme.spacing(0, 1),
  },
  progressWrapper: {
    width: 90,
  },
}));

export default useStyles;
