import Head from 'next/head';
import Link from 'next/link';

import Button from '../components/Button';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home | Rolai</title>
        <meta name="description" content="description" />
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>

      <Link href="/">Go to Main</Link>

      <Button label="Hello" />
    </div>
  );
}
