import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  milestoneProgress: {},
  milestoneSteps: {
    marginRight: theme.spacing(2),
  },
  milestoneBody: {
    '& .MuiMenu-paper': {
      top: '65px !important',
      left: 'initial !important',
      right: '20px !important',
      maxWidth: 590,
    },
  },
  milestoneAccordion: {
    borderRadius: 8,
    boxShadow: 'none',
    background: '#F8FAFF',
    margin: '16px !important',
    '&:before': {
      background: 'none',
    },
  },
  expandIcon: {
    transform: 'rotate(90deg)',
  },
  arrowButton: {
    padding: 0,
    minWidth: 30,
  },
  arrowIcon: {
    fontSize: 18,
    color: '#000000',
    opacity: 1,
    padding: theme.spacing(0.5),
  },
  milestoneNumber: {
    fontSize: 12,
    fontWeight: 500,
  },
  description: {
    '& h4': {
      '&:first-child': {
        marginTop: 0,
      },
    },
    '& h3': {
      fontSize: 14,
      fontWeight: 500,
    },
    '& p': {
      color: '#4A4C55',
      fontSize: 14,
    },
    '& ol>li': {
      color: '#4A4C55',
      fontSize: 14,
    },
  },
}));

export default useStyles;
