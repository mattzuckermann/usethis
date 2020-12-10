import { useRef, useState, useEffect } from "react";
import { useSpring, useChain, animated, config } from "react-spring";

const SplashAnimation = () => {
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
    <main className="splashContainer">
      <animated.div style={fade}>
        <h1 style={{ position: "relative" }}>
          <code>&lt;useThis/&gt;</code>
          <animated.div style={translate}>
            <img
              style={{
                position: "absolute",
                top: "-70px",
                right: "-80px",
                width: "2em",
              }}
              src="/JavaScript-logo.png"
            />
          </animated.div>
        </h1>
      </animated.div>
      <animated.div style={slide}>
        <code style={{ fontSize: "2rem" }}>
          mastering JavaScript's 'this' keyword
        </code>
      </animated.div>
    </main>
  );
};

export default SplashAnimation;
