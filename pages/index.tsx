import Head from "next/head";
import { withApollo } from "../lib/apollo";
import { FC } from "react";
import SplashAnimation from "../components/SplashAnimation";
import UserForm from "../components/UserForm";
import ResultForm from "../components/ResultForm";
import UserList from "../components/UserList";
import ResultList from "../components/ResultList";
import Footer from "../components/Footer";

const Home: FC = () => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <SplashAnimation />

      <div className="container">
        <UserForm />
        <UserList />
        <ResultForm />
        <ResultList />
        <Footer />
      </div>
      <style jsx global>{`
        html,
        body {
          scroll-behavior: smooth;
          background-position: center;
          background-size: 50px;
          background-repeat: no-repeat;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        .container {
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default withApollo(Home);
