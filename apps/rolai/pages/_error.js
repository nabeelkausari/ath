import Router from 'next/router';
import { useEffect } from 'react';

import Layout from '../components/Layout';

const Error = () => {
  useEffect(() => {
    Router.push('/');
  }, []);
  return <Layout title="Error" />;
};

export default Error;
