import "../assets/css/normalize.css";
import "../assets/css/style.css";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { withApollo } from "../lib/apollo";
import { Provider } from "next-auth/client";

export default function App({ Component, pageProps }) {
  const WrappedComponent = withApollo(Component);
  return (
    <Provider session={pageProps.session}>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="stylesheet" href="/fonts/stylesheet.css" />
      </Head>
      <section className="pageContainer">
        <main className="contentWrapper">
          <Header />
          <WrappedComponent {...pageProps} />
        </main>
        <Footer />
      </section>
    </Provider>
  );
}
