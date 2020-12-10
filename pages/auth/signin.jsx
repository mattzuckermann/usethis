import React, { useState, useEffect } from "react";
import { providers, signIn } from "next-auth/client";
import { useSpring, animated, config } from "react-spring";

export default function SignIn({ providers }) {
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    setToggle(true);
  });
  const props = useSpring({
    opacity: toggle ? 1 : 0,
    transform: toggle ? "translate(-50%, -50%)" : "translate(-50%, -60%)",
    config: config.molasses,
  });

  return (
    <animated.div className="centered card" style={props}>
      <h2>Sign In</h2>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </animated.div>
  );
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
  };
};
