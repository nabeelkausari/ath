import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

export const useFilterStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '15px 0 10px 0',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterIcon: {
    cursor: 'pointer',
  },
  filterBody: {
    '& .MuiPaper-root': {
      padding: theme.spacing(1),
      width: 370,
      // height: 333,
      minHeight: 150,
      borderRadius: 20,

      background: 'white',
      '& ul': {
        display: 'flex',

        flexWrap: 'wrap',
        '& div': {
          padding: theme.spacing(0.5, 1.5),
          background: theme.palette.secondary.light,
          borderRadius: 50,
          margin: 3,
          cursor: 'pointer',
          color: theme.palette.text.secondary,
          fontSize: 14,
          height: 30,
        },
        position: 'absolute',
      },
    },
  },
  filterSelected: {
    background: `${theme.palette.primary.main} !important`,
    color: 'white !important',
  },
  filterHeading: {
    background: 'initial !important',
    paddingLeft: '2px !important',
    width: '100%',
    fontWeight: 500,
    color: 'initial !important',
  },
}));

export const useHeaderStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '18px 0',
  },
  heading: {
    fontSize: 14,
    fontWeight: 500,
    margin: '0 5px',
  },
  icon: {},
  badge: {
    fontSize: 11,
    fontWeight: 600,
    height: 16,
    width: 16,
    lineHeight: 0.5,
    background: theme.palette.secondary.main,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const useCourseStyles = makeStyles((theme) => ({
  parent: {
    padding: '16px 16px 0 16px',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #70707040',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
}));

export const useBookmarkStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  count: {
    fontWeight: 'bold',
    fontSize: 11,
    lineHeight: 0.5,
    marginTop: -5,
    marginLeft: 5,
  },
}));

export const useSearchStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: '50px',
    backgroundColor: alpha(theme.palette.common.white, 0.85),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginRight: 0,
    marginLeft: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.main}`,
    width: '177px',
    height: '32px',
    '& .MuiInputBase-root': {
      width: '100%',
    },
    '& ::placeholder': {
      color: '#C8CEEE',
    },
  },
  searchIconWrapper: {
    padding: theme.spacing(0, 1.5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputBase: {
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(0.75, 0.75, 0.75, 0),
      fontSize: '14px',
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      flex: 1,
    },
  },
}));
