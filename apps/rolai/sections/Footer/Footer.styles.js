import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    background: 'white',
    minHeight: '200',
    padding: theme.spacing(5, 0),
    display: 'flex',
    justifyContent: 'space-between',
  },
  socialMediaSection: {
    width: 237,
    height: 109,
    borderRadius: 15,
    background: theme.palette.secondary.light,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  socialMediaFooterIcons: {
    display: 'flex',
    alignItems: 'center',
  },
  socialIcons: {
    height: '16px',
    padding: theme.spacing(0, 1.4),
    borderRight: '1px solid #CFDCE8',
    display: 'flex',
    '&:last-child': {
      borderRight: '0',
    },
  },
  footerDetails: {
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
  },
  footerDetailsLink: {
    display: 'flex',
    width: '80%',
    justifyContent: 'space-between',
    borderBottom: '1px solid #EFF2F5',
  },
  footerLinks: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(1),
  },
  links: {
    paddingBottom: theme.spacing(1),
  },
  copyRight: {
    paddingTop: theme.spacing(2.4),
  },
  scrollTopButton: {
    borderRadius: '50%',
    width: '40px',
    height: '60px',
  },
}));

export default useStyles;
