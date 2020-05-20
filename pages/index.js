import Head from "next/head";
import { useSpring, animated, config } from "react-spring";
export default function Home() {
  const useThis = () => {
    return "learning to use the JavaScripts 'this' keyword in a variety of contexts";
  };
  const fade = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: config.molasses,
  });

  return (
    <animated.div style={fade}>
      <div className="container">
        <Head>
          <title>useThis</title>
          <link rel="icon" href="/favicon.svg" />
        </Head>

        <main>
          <div>
            <h1 className="title">&lt; useThis/&gt;</h1>
            <br />
            <code>{`${useThis.toString()}`}</code>
          </div>
        </main>

        <footer>
          &copy;{new Date().getFullYear()} Matt Zuckermann. All Rights Reserved.
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
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
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
  );
}
