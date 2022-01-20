import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const useCommentStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
    '& >div:last-child': {
      marginLeft: '10px',
      fontSize: 12,
    },
  },
  primary: {
    color: theme.palette.primary.main,
  },
}));

export const useActionStyles = makeStyles((theme) => ({
  actions: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 25,
    marginBottom: 20,
  },
}));

export const useLessonStyles = makeStyles((theme) => ({
  actions: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 25,
    marginBottom: 20,
  },
  search: {
    border: `1px solid ${theme.palette.border.main} !important`,
    borderRadius: '20px',
  },
  filterBody: {
    '& .MuiPaper-root': {
      borderRadius: 20,
      boxShadow: '0px 4px 25px #153B7D14',
      background: 'white',
      fontSize: 14,
    },
  },
  lessons: {
    background: theme.palette.background.light,
    borderRadius: 10,
    padding: '5px 10px',
    margin: '10px 0',
  },
  module: {
    '& ._badge': {
      background: theme.palette.secondary.light,
      borderRadius: 15,
      height: '30px',
      display: 'inline-block',
      padding: '4px 10px',
      marginBottom: 5,
      color: theme.palette.text.secondary,
      '& span': {
        fontWeight: 500,
        color: theme.palette.text.primary,
      },
    },
    '& ._title': {
      fontWeight: 500,
    },
    '& ._lesson': {
      display: 'flex',
      alignItems: 'flex-start',
      margin: '10px 0',
      cursor: 'pointer',
      padding: '5px 0',
      '& ._icon': {
        marginRight: 10,
      },
      '&:hover': {
        color: theme.palette.primary.main,
        // fontWeight: 500,
      },
    },
    '&:hover': {
      '& ._title': {
        fontWeight: 500,
        color: theme.palette.primary.main,
      },
    },
  },
  menuWrapper: {
    width: 417,
    height: 550,
    padding: 20,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  menuBody: {
    overflow: 'auto',
    flex: 1,
    marginTop: 20,
  },
}));

export const useFilterStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 16,
    fontWeight: 500,
  },
  filterIcon: {
    cursor: 'pointer',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 30,
    height: 40,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 15px',
  },
  input: {
    marginBottom: '15px',
    width: '100% !important',
  },
  filterBody: {
    '& .MuiPaper-root': {
      padding: 20,
      width: 393,
      fontSize: 13,
      // height: 333,
      minHeight: 240,
      paddingTop: 10,
      borderRadius: 20,
      overflow: 'hidden',
      background: 'white',
      '& ul': {
        display: 'flex',
        width: 'calc(100% - 40px) !important',
        flexWrap: 'wrap',

        position: 'absolute',
      },
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
    fontWeight: '600',
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
export const useSortStyles = makeStyles((theme) => ({
  parent: {
    '& textarea:after, input:after': {
      display: 'none !important',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '0px solid #484850',
    },
    '& .MuiOutlinedInput-root': {
      border: '0px solid red !important',
    },
    '& .MuiInput-root': {
      borderRadius: '10px !important',
      width: '100%',
      marginTop: 2,
      border: '0px solid #B0C0D2',
      padding: '5px 15px',

      '&:before': { display: 'none' },
    },
    '& .MuiSelect-select': {
      padding: '0px 14px !important',
      marginTop: 2,
      paddingRight: '30px !important',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '0px solid #D5D9EE !important',
    },
  },
  select: {
    background: theme.palette.secondary.light,
    border: 'none',
    borderRadius: 20,
    height: '100%',
    minHeight: 30,
    fontSize: 13,
  },
  menuItem: {
    fontSize: 13,
  },
}));
