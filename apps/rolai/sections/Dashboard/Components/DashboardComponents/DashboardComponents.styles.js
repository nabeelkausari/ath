import { makeStyles } from '@mui/styles';

export const useDashboardHomeProgressStyles = makeStyles((theme) => ({
  progress: {
    // marginTop: 5,
    display: 'flex',
    alignItems: 'center',
    '& .MuiLinearProgress-root': {
      borderRadius: '13.02vh',
      background: '#E6E9F2',
    },
  },
  progressText: {
    marginLeft: '0.65vh',
    fontSize: '1.43vh',
    lineHeight: 0.5,
    fontWeight: 500,
  },
}));

export const useProgressStyles = makeStyles((theme) => ({
  progress: {
    // marginTop: 5,
    display: 'flex',
    alignItems: 'center',
    '& .MuiLinearProgress-root': {
      borderRadius: 100,
      background: '#E6E9F2',
    },
  },
  progressText: {
    marginLeft: 5,
    fontSize: 11,
    lineHeight: 0.5,
    fontWeight: 500,
  },
}));

export const useCourseStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10,
    minWidth: '50%',
  },
  detail: {
    fontSize: 12,

    marginLeft: 5,
  },
}));

export const useFilterStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10,
  },
  status: {
    fontSize: 11,
    fontWeight: 500,
    marginRight: 5,
  },

  filterBody: {
    padding: 0,

    '& .MuiPaper-root': {
      padding: 0,
      width: 200,
      maxHeight: 150,
      borderRadius: 5,
      height: '200px',
      position: 'relative',
      background: 'transparent',
      boxShadow: 'none',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',

      '& ul': {
        // display: 'flex',
        marginTop: 10,
        width: '96%',
        flexWrap: 'wrap',
        // overflow: 'auto',
        padding: 0,
        boxShadow: '0px 0px 10px #00000029',
        background: 'white',
        borderRadius: 5,

        '&::before': {
          /* tricky doubly-quoted empty string so mui parses it as truly empty */
          content: '""',
          display: 'block',
          width: '0',
          height: '0',
          position: 'absolute',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          /* border color should probably match whatever your tooltip color is */
          borderTop: '10px solid white',
          //   left: 'calc(50% - 10px)',
          top: '-8px',
          transform: 'rotate(180deg)',
          right: 10,
        },

        '& div': {
          //   background: '#F8F9FB',
          borderRadius: 0,
          // borderBottom: '1px solid #00000029',
          padding: '8px 10px',
          cursor: 'pointer',
          fontSize: 10,
        },
        '& >div:last-child': {
          borderBottom: 'none',
        },
        position: 'absolute',
      },
    },
  },
  filterSelected: {
    // background: '#5064E3 !important',
    color: theme.palette.primary.main,
  },
}));

export const useEmStyles = makeStyles((theme) => ({
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.3vh',
  },
  title: {
    fontSize: '1.82vh',
    fontWeight: 500,
  },
  button: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    fontSize: '1.56vh',
    marginTop: '0.78vh',
  },
}));
