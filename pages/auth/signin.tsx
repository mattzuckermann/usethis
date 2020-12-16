import React, { useState, useEffect, ReactElement } from 'react';
import { providers, signIn } from 'next-auth/client';
import { useSpring, animated, config } from 'react-spring';
import { Provider } from '../../@types/session';

export default function SignIn({
  providers,
}: {
  providers: Provider[];
}): ReactElement {
  const [toggle, setToggle] = useState(false);
  const [email, setEmail] = useState('');
  useEffect(() => {
    setToggle(true);
  });
  const props = useSpring({
    opacity: toggle ? 1 : 0,
    transform: toggle ? 'translate(-50%, -50%)' : 'translate(-50%, -60%)',
    config: config.molasses,
  });

  return (
    <animated.main className="centered card" style={props}>
      <h2>Sign In</h2>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          {provider.name !== 'Email' ? (
            <button
              style={{ width: '100%' }}
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          ) : (
            <div style={{ margin: 0 }}>
              <div className="separator">or</div>
              <form>
                <label>
                  Email:
                  <input
                    className="text-shortened"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                  />
                </label>
                <button
                  type="submit"
                  style={{ width: '100%' }}
                  onClick={(e) => {
                    e.preventDefault();
                    signIn('email', { email });
                  }}
                >
                  Sign in with Email
                </button>
              </form>
            </div>
          )}
        </div>
      ))}
    </animated.main>
  );
}

SignIn.getInitialProps = async () => {
  return {
    providers: await providers(),
  };
};
