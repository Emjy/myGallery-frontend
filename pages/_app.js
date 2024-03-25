import '../styles/globals.css';
import Head from 'next/head';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>F. Giraud</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
