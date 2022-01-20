import { makeStyles } from '@mui/styles';

export const STYLES = {
  color: {
    primary: '#2D43AA',
    title: '#727A9D',
    text: '#14215B',
  },
  border: {
    primary: '1px solid #D5D9EE',
  },
};

export const useCommonStyles = makeStyles((theme) => ({
  heading1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#14215B',
  },
  rosterUserDailog: {
    width: '1200px !important',
    maxWidth: '1200px !important',
    minHeight: '600px',
  },
}));

export const useStatusBarStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '30px',
    background: '#E2E4EF',
    borderRadius: 10,
    width: 120,
    overflow: 'auto',

    '&>div': {
      width: '50%',
      height: '100%',
      overflow: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
  },
  active: {
    // background: '#3DDF87',
    background: theme.palette.primary.main,
    color: 'white',
  },
}));

export const useSearchStyles = makeStyles((theme) => ({
  search: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    // justifyContent: 'space-between',
  },
}));
