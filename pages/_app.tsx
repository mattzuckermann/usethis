import React, { ReactElement } from 'react';
import '../assets/css/normalize.css';
import '../assets/css/style.css';
import Head from 'next/head';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import { withApollo } from '../lib/apollo';
import 'reflect-metadata';

export default function App({ Component, pageProps }: AppProps): ReactElement {
  const WrappedComponent = withApollo(Component);
  return (
    <Provider session={pageProps.session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="stylesheet" href="/fonts/stylesheet.css" />
      </Head>
      <section className="pageContainer">
        <main className="contentWrapper">
          <Header />
          {pageProps.authenticated === false ? (
            <Component {...pageProps} />
          ) : (
            <WrappedComponent {...pageProps} />
          )}
        </main>
        <Footer />
      </section>
    </Provider>
  );
}
