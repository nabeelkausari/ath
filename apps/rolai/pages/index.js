import Router from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Layout from '../components/Layout';

const Home = () => {
  const { is_logged_in } = useSelector((state) => state.auth);
  useEffect(() => {
    if (is_logged_in) {
      Router.push('/my-organization');
    }
  }, [is_logged_in]);
  return <Layout title="Home | Rolai" />;
};

export default Home;
