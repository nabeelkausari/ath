import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../../components/Input/Input';
import { isLoggedIn, resetPassword } from '../../../store/auth/actions';
import { validatePassword } from '../../../utils/api/tokens';
import { notify } from '../../../utils/helpers/notification';
import useStyles from './ForgotPassword.styles';

const ResetPasswordForm = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const [confirm, setConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {
    reset_password_requested,
    reset_password_succeeded,
    is_logged_in,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  useEffect(() => {
    if (is_logged_in) {
      return router.push('/');
    }
  }, [is_logged_in]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePassword(password, confirm)) {
      dispatch(resetPassword({ password, code: router.query.reset_code }));
    }
  };

  useEffect(() => {
    if (reset_password_succeeded) {
      router.replace('/');
      notify.success(
        'Password Changed Successfully! You can now login with your new password'
      );
    }
  }, [reset_password_succeeded]);

  return (
    <Box mt={5} marginX="auto" maxWidth="sm" className={styles.resetContainer}>
      <Typography pb={2} variant="h5">
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          label={'New Password'}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type={showPassword ? 'text' : 'password'}
          label={'Confirm Password'}
          onChange={(e) => setConfirm(e.target.value)}
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
        <div className={styles.loginActions}>
          <LoadingButton
            type="submit"
            loading={reset_password_requested}
            variant="contained"
          >
            Reset
          </LoadingButton>
        </div>
      </form>
    </Box>
  );
};

export default ResetPasswordForm;
