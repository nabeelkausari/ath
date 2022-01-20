import { makeStyles } from '@mui/styles';

import { NAVBAR_HEIGHT } from '../../../../utils/constants/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    ...theme.sections.dashboard.rightSection,
    height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,

    overflow: 'auto',
  },
  topItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spaceBetween: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  projectContainer: {
    display: 'grid',
    gridGap: '2.6vh',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifyContent: 'start',
  },
}));

export default useStyles;
