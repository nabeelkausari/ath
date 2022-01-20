import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  contentIconsContainer: {
    display: 'flex',
  },
  contentIcons: {
    minHeight: 16,
    maxHeight: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(0, 1.5),
    borderRight: '1px solid #CFDCE8',
    '& .MuiTypography-root': {
      lineHeight: '0 !important',
    },
    '&:first-child': {
      paddingLeft: theme.spacing(0),
    },
    '&:last-child': {
      borderRight: '0',
    },
    '& div:first-child': {
      display: 'flex',
      alignItems: 'center',

      '& > span': {
        lineHeight: 1.7,
        display: 'block',
      },
    },
  },
}));

export default useStyles;
