import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  assessmentOverview: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(10),
    height: 'fit-content',
    minWidth: 650,
  },
}));

export default useStyles;
