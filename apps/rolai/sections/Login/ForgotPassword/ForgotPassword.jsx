import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import {
  clearForgotPassword,
  forgotPassword,
} from '../../../store/auth/actions';
import useStyles from './ForgotPassword.styles';

const ForgotPassword = ({ setBackToLogin }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const { forgot_password_requested, forgot_password_succeeded } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (forgot_password_succeeded) {
      setEmailSent(true);
      dispatch(clearForgotPassword());
    }
  }, [forgot_password_succeeded]);
  return (
    <Box>
      <Typography pb={2} variant="h5">
        {emailSent ? 'Email Sent!' : 'Forgot Password'}
      </Typography>

      {emailSent ? (
        <Typography variant="subtitle2" pt={1} pb={3}>
          You will receive an email in your inbox, if not please check your{' '}
          <b>spam</b> or <b>junk</b> folder.
        </Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            label={'Email'}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={styles.loginActions}>
            <LoadingButton
              type="submit"
              loading={forgot_password_requested}
              variant="contained"
            >
              Send Reset Link
            </LoadingButton>
            <Button
              onClick={setBackToLogin}
              variant=""
              className={styles.backToLogin}
            >
              Back to Login
            </Button>
          </div>
        </form>
      )}
    </Box>
  );
};

export default ForgotPassword;
