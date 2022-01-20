import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  collaboratorSection: {
    minHeight: 300,
  },
  collaboratorWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& > $inputContainer': {
      background: 'pink',
    },
    '& .MuiInput-root': {
      width: 400,
      height: 35,
      borderRadius: 10,
    },
  },
  collaboratorSelect: {
    position: 'relative',
    flex: 1,

    '& .MuiInputLabel-root': {
      marginBottom: theme.spacing(1),
    },
  },
  accessType: {
    width: 200,
    height: 38,
    marginTop: theme.spacing(1),
  },
  addCollaboratorIcon: {
    marginTop: theme.spacing(3.5),
    cursor: 'pointer',
  },
  collaboratorDropdown: {
    border: '1px solid #B5BAD1',
    borderRadius: 10,
    padding: theme.spacing(1, 2),
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    boxShadow: '0px 3px 6px #00000030',
    zIndex: 9999,
    height: 200,
    overflow: 'auto',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  userInfo: {
    marginLeft: 5,
  },
  userName: {
    fontSize: 13,
  },
  userEmail: {
    fontSize: 13,
    color: '#00000055',
  },
}));

export default useStyles;
