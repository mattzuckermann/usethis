import Head from "next/head";
import Layout from "../components/Layout";
import gql from "graphql-tag";
import { withApollo } from "../lib/apollo";
import { useRef } from "react";
import { useSpring, useChain, animated, config } from "react-spring";
import { useQuery } from "@apollo/react-hooks";

const GET_THIS = gql`
  query GetIt {
    getThis
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(GET_THIS);
  function useThis() {
    return "learning to use the JavaScript 'this' keyword in a variety of contexts";
  }

  const fadeRef = useRef();
  const fade = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: config.slow,
    ref: fadeRef,
  });

  const translateRef = useRef();
  const translate = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: config.molasses,
    ref: translateRef,
  });

  const slideRef = useRef();
  const slide = useSpring({
    from: { opacity: 0, transform: "translateY(-100%)" },
    opacity: 1,
    transform: "translateY(0%)",
    config: config.slow,
    ref: slideRef,
  });

  useChain(
    [
      { current: fadeRef.current },
      { current: translateRef.current },
      { current: slideRef.current },
    ],
    [1.25, 2.1, 2.6]
  );

  return (
    <Layout>
      <animated.div style={fade}>
        <div className="container">
          <Head>
            <title>useThis</title>
            <link rel="icon" href="/favicon.svg" />
          </Head>

          <main>
            <div>
              <div>
                <animated.div style={translate}>
                  <img
                    style={{
                      top: "290px",
                      right: "400px",
                      position: "absolute",
                      width: "60px",
                    }}
                    src="/JavaScript-logo.png"
                  />
                </animated.div>
                <h1 className="title">
                  &lt;<span>useThis</span>/&gt;
                </h1>
              </div>
              <br />
              <animated.div style={slide}>
                <code
                  style={{ fontSize: "20px" }}
                >{`${useThis.toString()}`}</code>
              </animated.div>
            </div>
          </main>

          <footer>
            &copy;{new Date().getFullYear()} Matt Zuckermann. All Rights
            Reserved.
          </footer>

          <style jsx>{`
            code {
              color: white;
            }
            .container {
              background-image: url("/background.png");
              background-size: cover;
              min-height: 100vh;
              padding: 0 0.5rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            main {
              padding: 5rem 0;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            footer {
              width: 100%;
              height: 100px;
              border-top: 1px solid #eaeaea;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            footer a {
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .title {
              margin: 0;
              color: white;
              line-height: 1.15;
              font-size: 9rem;
              font-family: "Menlo";
              text-align: center;
            }

            code {
              border-radius: 5px;
              padding: 0.75rem;
              font-size: 1.1rem;
              font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
                monospace;
            }
          `}</style>

          <style jsx global>{`
            html,
            body {
              scroll-behavior: smooth;
              background-position: center;
              background-image: url("https://i.ya-webdesign.com/images/loading-png-gif.gif");
              background-size: 50px;
              background-repeat: no-repeat;
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
      </animated.div>
    </Layout>
  );
};

export default withApollo(Home);
