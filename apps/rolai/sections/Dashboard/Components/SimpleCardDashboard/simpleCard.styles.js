import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    borderRadius: '1.3vh !important',
    padding: '1.3vh',
    margin: '0 !important',
    marginBottom: '1.95vh !important',

    // border: '1px solid transparent',
    boxShadow: '0px 0px 2.6vh #00000008',
    '&:before': {
      display: 'none !important',
    },
    '& .MuiAccordionSummary-content': {
      margin: '0 !important',
      justifyContent: 'space-between',
      width: '100%',
    },
    '& .MuiAccordionDetails-root': {
      padding: 0,
    },
  },
  mainBlock: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    minHeight: 'initial !important',
  },
  left: {
    width: '70%',
  },
  borderLeft: {
    borderLeft: `0.52vh solid ${theme.palette.highlight.main} !important`,
    marginLeft: '-1.3vh',
    paddingLeft: '1.3vh',
  },
  onSelect: {
    borderLeft: '4px solid transparent',
  },
  chip: {
    padding: '0.52vh',
    fontSize: '1.3vh',
    fontWeight: 500,
    textTransform: 'capitalize',
    display: 'inline',
  },
  heading: {
    fontSize: '1.69vh',
    fontWeight: 500,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginTop: '0.65vh',
  },
  description: {
    fontSize: '1.69vh',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginTop: '0.65vh',
    display: 'flex',
    alignItems: 'center',
    '& >div:first-child': {
      // marginRight: '0.65vh !important',
    },
    '& >span:last-child': {
      marginRight: '0.65vh !important',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  },
  img: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '0.52vh',
  },
  rightComp: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  active: {
    // border: `1px solid ${theme.palette.primary.main}`,
  },
}));

export default useStyles;
