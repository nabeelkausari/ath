import { makeStyles } from '@mui/styles';

import { COURSE_STRUCTURE_NAVBAR_HEIGHT } from '../../../../utils/constants/styles';

const useStyles = makeStyles((theme) => ({
  titleBar: {
    position: 'fixed',
    maxWidth: 1500,
    width: '100%',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FAFBFF',
    borderBottom: '1px solid #eaecf1',
    flex: 1,
    height: COURSE_STRUCTURE_NAVBAR_HEIGHT,
  },
  title: {
    fontSize: '28px !important',
    lineHeight: '32px !important',
    fontWeight: '500 !important',
    lineClamp: 1,
    maxWidth: 900,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
}));

export default useStyles;
