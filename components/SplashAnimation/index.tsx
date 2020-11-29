import { useRef, useState, useEffect } from "react";
import { useSpring, useChain, animated, config } from "react-spring";

const SplashAnimation = () => {
  const useThis = () =>
    "learning to use the JavaScript 'this' keyword in a variety of contexts";

  const [loaded, setLoaded] = useState(false);

  const fadeRef = useRef(null!);
  const fade = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: config.slow,
    ref: fadeRef,
  });

  const translateRef = useRef(null!);
  const translate = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: config.gentle,
    ref: translateRef,
  });

  const slideRef = useRef(null!);
  const slide = useSpring({
    from: { opacity: 0, transform: "translateY(-100%)" },
    opacity: 1,
    transform: "translateY(0%)",
    config: config.gentle,
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
    [0.2, 0.9, 1.2]
  );

  useEffect(() => {
    setLoaded(true);
  });

  return (
    <main className="container">
      <animated.div style={fade}>
        <div>
          <h1 className="title" style={{ position: "relative" }}>
            &lt;
            <code style={{ fontSize: "9rem" }}>useThis</code>
            /&gt;
            <animated.div style={translate}>
              <img
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "60px",
                }}
                src="/JavaScript-logo.png"
              />
            </animated.div>
          </h1>
        </div>
      </animated.div>
      <animated.div style={slide}>
        <code style={{ fontSize: "1rem" }}>{`${useThis.toString()}`}</code>
      </animated.div>
      <style jsx>{`
        code {
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Inconsolata, Menlo, Monaco, Lucida Console,
            Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono,
            Courier New, monospace;
          color: white;
        }
        .container {
          background-image: url("/background.png");
          background-size: 100vw 150vh;
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
