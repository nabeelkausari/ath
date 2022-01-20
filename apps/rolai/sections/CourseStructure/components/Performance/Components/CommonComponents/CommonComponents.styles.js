import { makeStyles } from '@mui/styles';

export const usePieDetailStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
    marginRight: 18,
  },
  circle: {
    width: 13,
    height: 13,
    borderRadius: '50%',
    marginTop: 3,
    marginRight: 8,
  },
  heading: {
    fontSize: 14,
    fontWeight: 500,
  },
  description: {
    fontSize: 12,
    opacity: 0.7,
  },
}));

export const useDetailBlockStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
    background: theme.palette.secondary.light,
    borderRadius: 7,
    width: 351,
    height: 111,
    alignItems: 'center',
    // justifyContent: 'center',
    // margin: 20,
  },
  heading: {
    fontSize: 30,
  },
  description: {
    fontSize: 14,
  },
  icon: {
    margin: 35,
  },
}));

export const useTableStyles = makeStyles((theme) => ({
  parent: {
    // display: 'flex',
  },
  table: {
    '& td,th': {
      borderRight: '1px solid #70707012 !important',
      borderBottom: '1px solid #70707012 !important',
      fontSize: 13,
    },
    '& td:last-child,th:last-child': {
      borderRight: '0px solid #70707012 !important',
    },
    '& th': {
      borderTop: '1px solid #70707012 !important',
    },
    '& thead th': {
      color: '#4A4C55',
      fontWeight: 'initial',
    },
  },
}));
