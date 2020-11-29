import Head from "next/head";
import { withApollo } from "../lib/apollo";
import { FC } from "react";
import Header from "../components/Header/Header";
import SplashAnimation from "../components/SplashAnimation";
import FormSection from "../components/Forms/FormSection";
import Footer from "../components/Footer";

const linkArray = [
  { name: "API", path: "/api/graphql", targetBlank: true },
  { name: "Login", path: "/login", targetBlank: false },
  { name: "Study", path: "/study", targetBlank: false },
  { name: "Test", path: "/test", targetBlank: false },
];

const Home: FC = () => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header
        brand="Let's Learn Together"
        links={linkArray}
        absolute={true}
        color="primary"
      />
      <SplashAnimation />
      <FormSection />
      <Footer />
      <style jsx global>{`
        html,
        body {
          background-image: url("/Homepage.webp");
          background-color: #524762;
          background-repeat: "no-repeat";
          scroll-behavior: smooth;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default withApollo(Home);
