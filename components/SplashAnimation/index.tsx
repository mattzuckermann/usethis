import { useRef, useState, useEffect } from "react";
import { useSpring, useChain, animated, config } from "react-spring";

const SplashAnimation = () => {
  function useThis() {
    return "learning to use the JavaScript 'this' keyword in a variety of contexts";
  }

  const [loaded, setLoaded] = useState(false);

  const fadeRef = useRef(null!);
  const fade = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: config.molasses,
    ref: fadeRef,
  });

  const translateRef = useRef(null!);
  const translate = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: config.molasses,
    ref: translateRef,
  });

  const slideRef = useRef(null!);
  const slide = useSpring({
    from: { opacity: 0, transform: "translateY(-100%)" },
    opacity: 1,
    transform: "translateY(0%)",
    config: config.slow,
    ref: slideRef,
  });

  useChain(
    loaded
      ? [
          { current: fadeRef.current },
          { current: translateRef.current },
          { current: slideRef.current },
        ]
      : [],
    [0.5, 1.0, 1.7]
  );

  useEffect(() => {
    setLoaded(true);
  });

  return (
    <main className="container">
      <animated.div style={fade}>
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
          &lt;<code style={{ fontSize: "9rem" }}>useThis</code>/&gt;
        </h1>
        <animated.div style={slide}>
          <code style={{ fontSize: "20px" }}>{`${useThis.toString()}`}</code>
        </animated.div>
      </animated.div>
      <style jsx>{`
        code {
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          color: white;
          font-family: "Consolas, monospace";
        }
        .container {
          background-image: url("/background.png");
          background-size: 100vw;
          background-repeat: no-repeat;
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
          height: 100vh;
        }
        .title {
          margin: 0;
          color: white;
          line-height: 1.15;
          font-size: 9rem;
          font-family: "Menlo";
          text-align: center;
        }
      `}</style>
    </main>
  );
};

export default SplashAnimation;
