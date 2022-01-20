import '../styles/globals.css';
import '../styles/components.scss';
import 'aos/dist/aos.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import '../sections/TrackDetails/components/Courses/courses.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import '../sections/CourseStructure/components/Quiz/ActiveQuizBar/ActiveQuizBar.scss';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import AOS from 'aos';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Slide, ToastContainer } from 'react-toastify';

import theme from '../config/theme';
import { useStore } from '../store';

function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <Provider store={store}>
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Rolai</title>
        </Head>
        {/*<StyledEngineProvider injectFirst>*/}
        <ThemeProvider theme={theme}>
          <>
            <CssBaseline />
            <NextNProgress height={4} color="#5064e3" />
            <ToastContainer transition={Slide} />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
        {/*</StyledEngineProvider>*/}
      </>
    </Provider>
  );
}

export default App;
