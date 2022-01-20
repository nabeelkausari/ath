import { makeStyles } from '@mui/styles';

export const useProgressBoxStyles = makeStyles((theme) => ({
  parent: {
    boxShadow: '0px 3px 15px #153B7D0F',
    borderRadius: 10,
    border: '1px solid transparent',
    background: 'white',
    width: 128,
    height: 130,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    textAlign: 'center',
    padding: 21,
    fontSize: 13,
    cursor: 'pointer',
    '& .text-active': {
      opacity: 0.7,
      marginTop: 8,
    },
  },
  active: {
    border: `1px solid ${theme.palette.primary.main}`,
    '& .text-active': {
      opacity: 1,
    },
  },
}));

export const useAnalysisBoxStyles = makeStyles((theme) => ({
  parent: {
    padding: '0 30px',
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  parentIcon: {
    background: '#F8FAFF',
    borderRadius: 5,
    height: 50,
    width: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  info: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 5,
    '&>div:first-child': {
      fontSize: 30,
    },
    '&>div:last-child': {
      fontSize: 14,
      opacity: 0.7,
      marginBottom: 5,
      marginLeft: 10,
    },
  },
}));
