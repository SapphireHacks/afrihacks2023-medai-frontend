import Head from 'next/head';
import HomePage from '@/components/home';
import ProtectedLayout from '@/components/layouts/protected/CollapsedNavLayout';

const Home = () => {
  return (
    <>
      <Head>
        <title>MedAI</title>
        <meta name="description" content="MedAI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage />
    </>
  );
};

Home.getLayout = (page: any) => <ProtectedLayout>{page}</ProtectedLayout>;
Home.requireAuth = true;
export default Home;
