import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  milestoneProgressWrapper: {
    display: 'flex',
    alignItems: 'baseline',
  },
  milestoneMore: {
    width: 10,
    height: 18,
    fill: 'black',
    margin: theme.spacing(0, 1),
    transform: 'rotate(270deg)',
  },
  milestoneArrowIcon: {
    cursor: 'pointer',
  },
  milestoneProgress: {
    display: 'flex',
    alignItems: 'baseline',
  },
  milestone__divider: {
    minWidth: 13,
    height: 1,
    background: '#C9CCCB',
  },
  activemilestone: {
    background: theme.palette.primary.main,
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
  },
  milestoneCount: {
    fontSize: '10px !important',
    padding: `${theme.spacing(0.2, 0, 0, 0.65)} !important`,
  },
  lessonStatus: {
    width: 14,
    height: 14,
    borderRadius: 50,
    border: '1px dashed #9FA8A5',
  },
  lessonStatusInProgress: {
    width: 14,
    height: 14,
    borderRadius: 50,
    border: '1px dashed #9FA8A5',
    borderRight: '2px solid #5064E3',
    transform: 'rotate(-40deg)',
  },
}));

export default useStyles;
