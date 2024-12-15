import { AppProps } from 'next/app';
import Head from 'next/head';
import "./globals.css"; // Assuming you have global styles

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My App</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
