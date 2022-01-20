import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  exploreContainer: {
    minWidth: 280,
    width: 280,
    margin: '40px auto',
  },
  checkboxFilterSubSection: {
    paddingTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  categoryTitle: {
    padding: theme.spacing(1, 0),
  },
  searchInput: {
    width: '100%',
    height: 40,
    fontSize: 13,
    padding: theme.spacing(2, 2, 2, 5),
    borderRadius: ' 50px 0 0 50px ',
    border: '1px solid #B0C0D2',
    '&:focus': {
      outline: 0,
      borderColor: alpha(theme.palette.primary.main, 1),
    },
  },
  searchButton: {
    '&.MuiButtonBase-root': {
      borderRadius: '0 50px 50px 0',
    },
  },
  searchIcon: {
    position: 'absolute',
    left: theme.spacing(1.5),
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    width: '100%',
    position: 'relative',
  },
  showAll: {
    padding: theme.spacing(1, 0),
    fontWeight: 400,
  },
}));

export default useStyles;
