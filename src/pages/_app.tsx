// pages/_app.tsx
import '@/styles/globals.css';
import Layout from '@/utilities/navigation/layout';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
    </>
  );
};

export default MyApp;
