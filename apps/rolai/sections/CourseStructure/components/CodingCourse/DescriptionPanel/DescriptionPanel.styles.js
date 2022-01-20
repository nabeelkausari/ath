import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { PALETTE_YELLOW_MAIN } from '../../../../../config/theme';

const useStyles = makeStyles((theme) => ({
  DescriptionWrapper: {
    // flex: 0.4,
    width: 290,
    borderRadius: 15,
    border: '1px solid #EBEEF1',
    marginLeft: theme.spacing(4.4),
  },
  appBarWrapper: {
    boxShadow: 'none',
    background: 'transparent',
    borderBottom: '1px solid #EAEDF1',
    padding: theme.spacing(1, 1, 0, 1),
    '& button': {
      textTransform: 'capitalize',
    },
  },
  noteSection: {
    // width: 290,
  },
  tabPanelWrapper: {
    height: 'calc(100vh - 210px)',
    overflow: 'scroll',
    '& .MuiPaper-root': {
      width: 290,
      position: 'relative',
      border: 'none',
      boxShadow: 'none',
      marginTop: theme.spacing(0),
      '& .MuiBox-root:first-child': {
        '& svg': {
          display: 'none',
        },
      },
    },
  },
  notesCount: {
    width: 17,
    height: 17,
    fontSize: 10,
    color: 'white',
    borderRadius: 50,
    background: PALETTE_YELLOW_MAIN,
    textAlign: 'center',
  },
}));

export default useStyles;
