import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';

import ForgotPassword from './ForgotPassword/ForgotPassword';
import useStyles from './Login.styles';
import LoginForm from './LoginForm/LoginForm';
import LoginLeftPanel from './LoginLeftPanel/LoginLeftPanel';

const Login = ({ closeModal, ...props }) => {
  const styles = useStyles();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box
      sx={{
        width: {
          sm: 600,
          md: 840,
        },
      }}
      className={styles.loginContainer}
    >
      <LoginLeftPanel />
      <Box paddingX={6} className={styles.loginRightPanel}>
        <Box
          className={styles.loginRightPanelConatiner}
          position="absolute"
          top={30}
          right={40}
        >
          <CloseIcon onClick={closeModal} className={styles.closeIconImage} />
        </Box>
        {isLogin ? (
          <LoginForm setForgotPasswordView={() => setIsLogin(false)} />
        ) : (
          <ForgotPassword setBackToLogin={() => setIsLogin(true)} />
        )}
      </Box>
    </Box>
  );
};

export default Login;
