import Router from 'next/router';
import { useEffect } from 'react';

import Layout from '../components/Layout';

const FourZeroFour = () => {
  useEffect(() => {
    Router.push('/');
  }, []);
  return <Layout title="Page Not Found" />;
};

export default FourZeroFour;
