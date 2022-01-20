import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: '#FBFCFD',
  },
  tabsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 30,
  },
  tabContainer: {
    zIndex: 9,
    width: '100%',
    padding: theme.spacing(0, 3),
    marginBottom: theme.spacing(2.4),

    '& .MuiButtonBase-root': {
      textTransform: 'none',
    },

    '& .active': {
      display: 'none',
    },
    '& .in-active': {
      display: 'flex',
    },

    '& .Mui-disabled': {
      color: theme.palette.text.secondary,
      opacity: 0.5,
      cursor: 'not-allowed',
    },

    '& .MuiTab-root.Mui-selected': {
      '& .active': {
        display: 'flex',
      },
      '& .in-active': {
        display: 'none',
      },
    },

    '& .MuiTab-root.Mui-disabled': {
      '& path': {
        fill: '#00000060',
      },
    },
  },
  tabLabel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabLabelText: {
    marginLeft: `${theme.spacing(1)} !important`,
    fontSize: '13px !important',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 2.5),
    background: theme.palette.secondary.main,
  },
  header_title_text: {
    lineClamp: 1,
    overflow: 'hidden',
    display: '-webkit-box',
    boxOrient: 'vertical',
    wordBreak: 'break-word',
    paddingRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  rightSection: {
    display: 'flex',
    alignItems: 'baseline',
  },
  milestoneSteps: {
    padding: theme.spacing(0, 2),
  },
  backIcon: {
    cursor: 'pointer',
  },
  addCollaborator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  collaborators: {
    display: 'flex',
    '& .comment-card__initials': {
      marginLeft: -15,
      border: '2px solid #fff',
      position: 'relative',
      cursor: 'pointer',
    },
    '& .profilename': {
      position: 'absolute',
      bottom: '-2.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#C8CEEE',
      padding: '0.5rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },

  addCollaboratorIcon: {
    display: 'flex',
    cursor: 'pointer',
    width: 25,
  },
  discardConsole: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
  },
}));

export default useStyles;
