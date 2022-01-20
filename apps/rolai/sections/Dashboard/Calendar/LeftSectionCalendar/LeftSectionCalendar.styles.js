import { makeStyles } from '@mui/styles';

import { PALETTE_TEXT_MAIN } from '../../../../config/theme';

const useStyles = makeStyles((theme) => ({
  parent: {
    width: 257,
    zIndex: 1,
    background: '#FAFBFD',
  },
  calendar: {
    marginTop: 61,
    padding: 20,
    borderTop: '1px solid #E6E7EB',
    minHeight: 300,
  },
  filter: {
    padding: 20,
    paddingTop: '0 !important',
  },
  heading: {
    color: PALETTE_TEXT_MAIN,
    fontWeight: 500,
    fontSize: 14,
    marginBottom: 5,
  },
}));

export default useStyles;
