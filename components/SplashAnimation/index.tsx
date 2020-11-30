import { useRef, useState, useEffect } from "react";
import { useSpring, useChain, animated, config } from "react-spring";

const SplashAnimation = () => {
  const useThis = () => "mastering JavaScript's 'this' keyword";

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
    <main>
      <animated.div style={fade}>
        <div>
          <h1
            className="title"
            style={{ position: "relative", fontSize: "9rem" }}
          >
            &lt;
            <code>useThis</code>
            /&gt;
            <animated.div style={translate}>
              <img
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "4rem",
                }}
                src="/JavaScript-logo.png"
              />
            </animated.div>
          </h1>
        </div>
      </animated.div>
      <animated.div style={slide}>
        <code style={{ fontSize: "1.5rem" }}>{`${useThis.toString()}`}</code>
      </animated.div>
      <style jsx>{`
        code {
          border-radius: 5px;
          padding: 0.75rem;
          font-family: Inconsolata, Menlo, Monaco, Lucida Console,
            Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono,
            Courier New, monospace;
          color: white;
        }
        .container {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          background-image: url("/background.png");
          background-size: 100vw 150vh;
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
