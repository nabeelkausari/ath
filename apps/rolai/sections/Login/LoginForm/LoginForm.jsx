import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import { clearLogin, login } from '../../../store/auth/actions';
import useStyles from './LoginForm.styles';

const LoginForm = ({ setForgotPasswordView }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login_requested, login_failed } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (login_failed) {
      dispatch(clearLogin());
    }
  }, [email, password]);

  return (
    <Box className={styles.root}>
      <Typography variant="h5"> Login </Typography>
      <Typography
        variant="subtitle2"
        pt={1}
        pb={2}
        className={styles.loginSubTitle}
      >
        Login with your organization credentials
      </Typography>
      <form onSubmit={handleLogin}>
        <Input className={styles.email}
          error={login_failed}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          label={'Email'}
        />
        <Input className={styles.password}
          error={login_failed}
          type={showPassword ? 'text' : 'password'}
          label={'Password'}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                size="large">
                {showPassword ? (
                  <Visibility className={styles.passwordVisiblity} />
                ) : (
                  <VisibilityOff className={styles.passwordVisiblity} />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        {login_failed && (
          <div className={styles.loginError}>
            The username/password combination you have entered is invalid.
            Please try again or connect your administrator
          </div>
        )}
        <div className={styles.loginActions}>
          <LoadingButton
            type="submit"
            loading={login_requested}
            variant="contained"
          >
            Login
          </LoadingButton>
          <Button
            onClick={setForgotPasswordView}
            variant="text"
            className={styles.forgotPassword}
          >
            Forgot Password?
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default LoginForm;
