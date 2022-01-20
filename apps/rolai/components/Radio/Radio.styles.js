import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  radio_group: {},
  radio_group__item: {
    color: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1.8),
    marginRight: theme.spacing(1),
  },
  radio_group__item__disabled: {
    opacity: 0.3,
    cursor: 'not-allowed',
    '& > *': {
      cursor: 'not-allowed',
    },
  },
  radio_group__item__horizontal: {
    marginRight: '2rem',
  },

  radio_group__label__text: {
    fontSize: 14,
    marginLeft: theme.spacing(0.4),
    wordBreak: 'break-all',
  },

  radio_group__item__wrong: {
    '& .radio_group__radio_wrapper': {
      borderColor: 'red',
    },
    '& .radio_group__label': {
      color: 'red',
      fontWeight: 600,
    },
    '& .radio_group__radio_wrapper:after': {
      backgroundColor: 'red !important',
    },
  },
  radio_group__item__correct: {
    '& .radio_group__radio_wrapper': {
      borderColor: 'green',
    },
    '& .radio_group__label': {
      color: 'green',
      fontWeight: 600,
    },
  },
  radio_group__item__warning: {
    '& .radio_group__radio-wrapper__checked': {
      border: '0.1rem solid #fba202',
      '&:after': {
        backgroundColor: '#fba202 !important',
      },
    },
    '& .radio_group__radio_wrapper': {
      borderColor: '#fba202',
    },
    '& .radio_group__label': {
      color: '#fba202',
      fontWeight: 600,
    },
  },
  radio_group__item__user_correct: {
    '& .radio-group__radio_wrapper:after': {
      backgroundColor: 'green !important',
    },

    '& .radio_group__radio_wrapper': {
      borderColor: 'green',
    },

    '& .radio_group__label': {
      color: 'green',
      fontWeight: 600,
    },
  },

  radio_group__item__match: {
    '& .radio_group__radio_wrapper__checked': {
      border: '0.1rem solid green',
      '&:after': {
        backgroundColor: 'green !important',
      },
    },

    '& .radio_group__radio_wrapper': {
      borderColor: 'green',
    },

    '& .radio_group__label': {
      color: 'green',
      fontWeight: 600,
    },
  },

  radio_group__radio_wrapper: {
    // minWidth: 8,
    // width: 8,
    // height: 8,
    // padding: '.5rem',
    // borderRadius: 50,
    // border: '.1rem solid #EBEEF1',
    // position: 'relative',
    // "&:after":{
    //   content: "",
    //   height: 10,
    //   width: 10,
    //   borderRadius: 5,
    //   border: 'none',
    //   position: 'absolute',
    //   top: '0.1rem',
    //   left: '0.1rem',
    //   backgroundColor: 'transparent',
    // },
  },
  radio_group__radio_wrapper__checked: {
    border: '.1rem solid #EBEEF1',
  },
  radio_group__radio: {
    // display: 'none',
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },

  radio_group__label: {
    marginBottom: '0 !important',
    width: '90%',
    display: 'flex',
  },
  // radio_group__label__horizontal:{
  //   // width: 'unset',
  // },

  'input[type="radio"]:checked ~ .radio_group__label': {
    '& radio_group__radio_wrapper:after': {
      content: '',
      height: 12,
      width: 12,
      border: 'none',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      // backgroundColor: var(--highlight-primary),
    },
  },

  radio_group__1: {
    '& input[type="radio"]:after': {
      // backgroundColor: var(--bg-3),
    },
  },

  radio_group__horizontal: {
    display: 'flex',
  },
}));

export default useStyles;
