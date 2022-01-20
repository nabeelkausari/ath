import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    borderRadius: '10px !important',
    padding: 10,
    margin: '0 !important',
    marginBottom: '15px !important',

    // border: '1px solid transparent',
    boxShadow: '0px 0px 20px #00000008',
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
    borderLeft: `4px solid ${theme.palette.highlight.main} !important`,
    marginLeft: '-10px',
    paddingLeft: '10px',
  },
  onSelect: {
    borderLeft: '4px solid transparent',
  },
  chip: {
    background: '#E6E6E6',
    padding: '4px 4px',
    fontSize: 10,
    fontWeight: 500,
    textTransform: 'capitalize',
    display: 'inline',
  },
  heading: {
    fontSize: 13,
    fontWeight: 500,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginTop: '5px',
  },
  description: {
    fontSize: 13,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginTop: 5,
    display: 'flex',
    alignItems: 'center',
    '& >div:first-child': {
      // marginRight: '5px !important',
    },
    '& >span:last-child': {
      marginRight: '5px !important',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  },
  img: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 3,
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
