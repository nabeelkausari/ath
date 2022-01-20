import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import Head from 'next/head';

import Header from '../../../components/Header';
import ResetPasswordForm from '../../../sections/Login/ResetPassword/ResetPassword';
import { NAVBAR_HEIGHT } from '../../../utils/constants/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '70vh',
    paddingTop: `${NAVBAR_HEIGHT}px`,
  },
}));

export default function ResetPassword() {
  const styles = useStyles();

  return (
    <div>
      <Head>
        <title>Reset Password | Rolai</title>
        <meta name="description" content="description" />
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>
      <>
        <Header />
        <div className={styles.root}>
          <Container maxWidth="xs">
            {/*<div className={styles.container}></div>*/}
            <ResetPasswordForm />
          </Container>
        </div>
      </>
    </div>
  );
}
