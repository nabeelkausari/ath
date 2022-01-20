import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  insights: {
    '& .text-item': {
      border: '1px solid transparent',

      '&:hover:not(.read-only)': {
        background: '#fff',
        borderColor: '#EBEEF1',

        '& .dashboard-element__icons': {
          visibility: 'visible',
        },
      },
    },
    '& .card-output': {
      background: '#fff',
      borderRadius: 15,
      border: '1px solid #EBEEF1',

      '&__header': {
        padding: theme.spacing(0, 3),

        '&-wrapper': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',

          '&--title': {
            fontSize: 16,
            fontWeight: '600',
          },

          '&--icons': {
            display: 'flex',
            flexDirection: 'row',

            '& .icon': {
              width: 40,
              height: 20,
              cursor: 'pointer',
            },
          },
        },
      },
    },

    '& .dashboard-element__wrapper': {
      display: 'flex',
    },

    '& .dashboard-element__input-wrapper': {
      display: 'flex',
      flex: 1,

      '& .dashboard-element__text': {
        flex: 1,
        textAlign: 'left',

        '&.heading': {
          fontSize: 24,
        },
        '&.sub-heading': {
          fontSize: 18,
        },
      },
      '& .dashboard-element__icons': {
        visibility: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        marginRight: 8,
        marginTop: 8,

        '& .icon': {
          width: 30,
          height: 20,
          cursor: 'pointer',
        },
      },
    },
  },
}));

export default useStyles;
