import Container from '@mui/material/Container';
import Head from 'next/head';
import React from 'react';

import Header from '../Header/Header';
import useStyles from './ListLayout.styles';

const ListLayout = ({
  title = 'Rolai',
  description = 'description',
  children,
}) => {
  const styles = useStyles();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <>
        <Header />
        <div className={styles.root}>
          <Container
            className={styles.listContainer}
            fixed
            disableGutters={true}
            maxWidth="md"
          >
            {children}
          </Container>
        </div>
      </>
    </div>
  );
};

export default ListLayout;
