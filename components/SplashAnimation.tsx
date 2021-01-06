import { useRef, useState, useEffect, ReactElement } from 'react';
import { useSpring, useChain, animated, config } from 'react-spring';

const SplashAnimation = (): ReactElement => {
  const [loaded, setLoaded] = useState(false);

  const fadeRef = useRef(null);
  const fade = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: config.slow,
    ref: fadeRef,
  });

  const translateRef = useRef(null);
  const translate = useSpring({
    from: {
      opacity: 0,
      transform: 'rotate(360deg)',
    },
    opacity: 1,
    transform: 'rotate(0deg)',
    config: config.gentle,
    ref: translateRef,
  });

  const slideRef = useRef(null);
  const slide = useSpring({
    from: { opacity: 0, transform: 'translateY(-100%)' },
    opacity: 1,
    transform: 'translateY(-40%)',
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
    [0.2, 0.6, 0.8]
  );

  useEffect(() => {
    setLoaded(true);
  });

  return (
    <main className="splashContainer">
      <animated.div style={fade}>
        <h1>
          <code>&lt;useThis/&gt;</code>
          <div className="absoluteJavaScriptLogo">
            <animated.div style={translate}>
              <img alt="JavaScript-logo" src="/black-js-logo.png" />
            </animated.div>
          </div>
        </h1>
      </animated.div>
      <animated.div style={slide}>
        <h2>
          <code>mastering JavaScript&#39;s &#39;this&#39; keyword</code>
        </h2>
      </animated.div>
    </main>
  );
};

export default SplashAnimation;
