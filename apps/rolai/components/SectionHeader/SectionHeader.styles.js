import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  sectionHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(0, 1),
  },

  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  sectionHeaderContent: {
    fontWeight: '400',
    display: 'flex',
    alignItems: 'center',
  },
  listCount: {
    background: '#EEF0F8',
    borderRadius: 10,
    padding: theme.spacing(0, 1.3),
    fontSize: 14,
  },
  viewAllContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewAllButton: {
    fontSize: '12px !important',
  },
  viewIcons: {
    width: 25,
    height: 25,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
    border: '1px solid #EAECF1',
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  smallIcon: {
    fontSize: 18,
    color: '#000000',
    opacity: 1,
    padding: theme.spacing(0.5),
  },
}));

export default useStyles;
