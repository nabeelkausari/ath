import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  instructionsSection: {
    width: 290,
    padding: theme.spacing(2),
  },
  instructionsData: {
    fontSize: 14,
    '& h4': {
      fontWeight: 500,
    },
    '& p': {
      '& code': {
        color: '#FF0000',
      },
    },
    '& h3': {
      fontSize: 14,
    },
    '& ol': {
      wordWrap: 'break-word',
      padding: theme.spacing(2),
      background: '#F8FAFF',
      borderRadius: 15,
      '& code': {
        color: '#FF0000',
      },
      '& li::marker': {
        borderRadius: 50,
        background: 'white',
        padding: theme.spacing(1),
        border: '1px solid #EBEEF1',
      },
    },
    '& ul': {
      wordWrap: 'break-word',
      padding: theme.spacing(2),
      background: '#F8FAFF',
      borderRadius: 15,
      '& code': {
        color: '#FF0000',
      },
      '& li::marker': {
        borderRadius: 50,
        background: 'white',
        padding: theme.spacing(1),
        border: '1px solid #EBEEF1',
      },
    },
    '& blockquote': {
      margin: theme.spacing(0),
      padding: theme.spacing(0, 2),
      '& p': {
        margin: theme.spacing(0),
      },
    },
  },
  milestone_list: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  milestone__button: {
    height: 24,
    minWidth: 24,
    color: theme.palette.primary.main,
    background: theme.palette.secondary.main,
    padding: '8px !important',
    margin: theme.spacing(0, 0.5),
    '&:hover': {
      color: theme.palette.primary.main,
      background: '#FFFFFF',
      border: '1px solid #5064E3',
    },
  },
  average: {
    color: 'white',
    backgroundColor: '#fba202',
  },
  good: {
    color: 'white',
    backgroundColor: '#008E78',
  },
  active: {
    color: 'white',
    background: theme.palette.primary.main,
  },
  viewMoreBtn: {
    fontSize: 12,
    fontWeight: 400,
    padding: theme.spacing(1, 0),
  },
}));

export default useStyles;
