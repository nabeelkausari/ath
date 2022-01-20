import Container from '@mui/material/Container';
import cx from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AdminLayout } from '../../sections/Admin/AdminLayout/AdminLayout';
import ActiveQuizBar from '../../sections/CourseStructure/components/Quiz/ActiveQuizBar/ActiveQuizBar';
import { DashboardLayout } from '../../sections/Dashboard/DashboardLayout/dashboardLayout';
import Footer from '../../sections/Footer/Footer';
import TopBanner from '../../sections/TopBanner/TopBanner';
import { isLoggedIn } from '../../store/auth/actions';
import { setActiveQuiz } from '../../store/courses/quiz/actions';
import GlobalDialog from '../GlobalDialog/GlobalDialog';
import Header from '../Header';
import useStyles from './Layout.styles';

const executeScroll = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
const Layout = ({
  title = 'Rolai',
  description = 'description',
  children,
  isBanner = false,
  container = true,
  fixed = true,
  disableGutters = true,
  maxWidth = 'md',
  className,
  style,
  admin = false,
  isFooter = true,
  auth = true,
  dashboard = false,
}) => {
  const styles = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { is_logged_in, is_logged_in_check } = useSelector(
    (state) => state.auth
  );
  const { active_quiz, quiz_over, quiz_questions_succeeded } = useSelector(
    (state) => state.courses.quiz
  );

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  useEffect(() => {
    if (is_logged_in_check && auth && !is_logged_in) {
      return router.push('/');
    }
  }, [auth, is_logged_in_check, is_logged_in]);

  const handleMinimizeView = () => {
    dispatch(setActiveQuiz({ minimized: !active_quiz.minimized }));
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>

      <>
        <Header />
        <GlobalDialog />
        {!quiz_over && active_quiz && active_quiz.active_quiz_id && (
          <ActiveQuizBar
            minimizeView={handleMinimizeView}
            minimized={active_quiz.minimized}
            active_quiz_id={active_quiz.active_quiz_id}
            {...active_quiz.lesson}
          />
        )}
        <div className={cx([styles.root, 'container-holder'])}>
          {container ? (
            <Container
              fixed={fixed}
              disableGutters={disableGutters}
              maxWidth={maxWidth}
              className={className}
            >
              {isBanner && <TopBanner />}
              {children}
            </Container>
          ) : (
            <ScreenLayout admin={admin} dashboard={dashboard}>
              {children}
            </ScreenLayout>
          )}
        </div>
        {isFooter && <Footer executeScroll={executeScroll} />}
      </>
    </>
  );
};

export default Layout;

const ScreenLayout = ({ admin, children, dashboard }) => {
  const styles = useStyles();

  if (admin)
    return (
      <div className={styles.admin}>
        <AdminLayout />
        <div>{children}</div>
      </div>
    );
  else if (dashboard)
    return (
      <div className={styles.dashboard}>
        <DashboardLayout />
        {children}
      </div>
    );
  else return children;
};
