import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  stepsSection: {
    // width: 290,

    position: 'relative',
  },
  stepsWithUndo: {
    marginTop: 40,
  },
  stepsAction: {
    position: 'sticky',
    width: '100%',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    zIndex: 2,
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  actionItem: {
    display: 'flex',
    cursor: 'pointer',
    margin: theme.spacing(0.5, 1),
  },
  actionItemIcon: {
    width: 18,
    height: 18,
    color: theme.palette.primary.main,
    marginRight: 4,
    marginTop: -1,
  },
  actionItemText: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  steps: {
    listStyle: 'none',
    padding: theme.spacing(1, 1, 0, 1),
    marginTop: 0,

    '& .step > div': {
      margin: theme.spacing(1.5),
      padding: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      marginLeft: theme.spacing(3.5),
      borderRadius: theme.spacing(2),
      background: '#F8FAFF',
      position: 'relative',
      cursor: 'pointer',

      '&.error': {
        background: '#ffeff4',
      },

      '& .index-no__wrapper': {
        position: 'absolute',
        left: theme.spacing(-2),
        top: theme.spacing(2.5),
        fontSize: 14,
        width: theme.spacing(4),
        height: theme.spacing(4),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        background: '#fff',
        border: '1px solid #EAEDF1',

        '&--error': {
          color: '#ec407a',
        },

        '& .stop-step': {
          width: 12,
          height: 12,
          backgroundColor: '#fff',
          transition: '0.5s all',
        },
      },

      '& .pin-step': {
        position: 'absolute',
        right: 12,
        top: 8,
      },
    },
  },
  stepInfo: {
    '& .step__functions-wrapper, .step__columns-wrapper': {
      display: 'flex',
      '& .step__icon-wrapper': {
        minWidth: 24,
      },
    },

    '& .step__columns-name, .step__function-name': {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      color: '#000',
      opacity: 0.7,
      fontSize: 14,
      fontWeight: '400',
    },

    '& .step__function-name': {
      fontWeight: '500',
    },
  },
}));

export default useStyles;
