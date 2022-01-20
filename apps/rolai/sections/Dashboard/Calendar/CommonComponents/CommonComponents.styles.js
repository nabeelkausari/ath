import { makeStyles } from '@mui/styles';

export const useNavigationStyles = makeStyles((theme) => ({
  dateNavigation: {
    minWidth: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthLeft: {
    transform: 'rotate(90deg)',
    cursor: 'pointer',
  },
  monthRight: {
    transform: 'rotate(-90deg)',
    cursor: 'pointer',
  },
  yearLeft: {
    cursor: 'pointer',
    display: 'flex',
    cursor: 'pointer',
    '& >div:first-child': {
      marginRight: '-8px !important',
    },
    '& >div': {
      transform: 'rotate(90deg)',
    },
  },
  yearRight: {
    display: 'flex',
    cursor: 'pointer',
    '& >div:first-child': {
      marginRight: '-8px !important',
    },
    '& >div': {
      transform: 'rotate(-90deg)',
    },
  },
}));

export const useCheckboxStyles = makeStyles((theme) => ({
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
    color: '#272C3D',
    marginLeft: 5,
    '& svg': {
      width: 28,
      height: 28,
    },
  },
}));

export const useAvatarStyles = makeStyles((theme) => ({
  avatar: {
    fontSize: '12px',
    color: theme.palette.primary.main,
    background: theme.palette.secondary.main,
  },
}));

export const useFilterStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '12px 0 10px 0',
    fontSize: 14,
  },
  heading: {
    fontSize: 16,
    fontWeight: 500,
  },
  filterIcon: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& span': {
      opacity: 0.7,
      fontSize: 14,
      marginLeft: 5,
    },
  },
  filterBody: {
    '& .MuiPaper-root': {
      fontSize: 14,

      padding: '15px',
      width: 393,
      height: 301,
      minHeight: 150,
      borderRadius: 20,

      background: 'white',
      '& .MuiInput-root': {
        borderRadius: '10px !important',
        width: '100%',
        marginTop: 2,
        border: '1px solid #B0C0D2',
        padding: '5px 10px',
        '&:before': { display: 'none' },
      },
      '& ul': {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: 'calc(100% - 30px)',
        position: 'absolute',
        padding: 0,
      },
    },
  },
  types: {
    display: 'flex',
    flexWrap: 'wrap',
    '& div': {
      padding: theme.spacing(0.5, 1.5),
      background: '#F8F9FB',
      borderRadius: 50,
      margin: 3,
      cursor: 'pointer',
    },
  },
  filterSelected: {
    background: '#5064E3 !important',
    color: 'white',
  },
  filterHeading: {
    background: 'initial !important',
    paddingLeft: '2px !important',
    width: '100%',
    fontWeight: '500',
  },
  buttonGroup: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}));
