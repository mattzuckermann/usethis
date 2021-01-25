import React, { useState, useEffect, ReactElement } from 'react';
import Link from 'next/link';
import { providers, signIn } from 'next-auth/client';
import { useSpring, animated, config } from 'react-spring';
import { Provider } from '../../@types/session';
import { Input } from '../../components/Form/Input';

export default function SignIn({
  providers,
}: {
  providers: Provider[];
}): ReactElement {
  const [toggle, setToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
          {provider.name !== 'Credentials' ? (
            <button className="full-width" onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          ) : (
            <div>
              <div className="separator">or</div>
              <form method="POST">
                <Input
                  name="Email"
                  value={email}
                  placeholder="demo@demo.com"
                  setState={setEmail}
                />
                <Input
                  name="Password"
                  value={password}
                  placeholder="demo"
                  setState={setPassword}
                />
                <button
                  className="full-width"
                  disabled={!email || !password}
                  onClick={async (e) => {
                    e.preventDefault();
                    await signIn('credentials', {
                      email,
                      password,
                    });
                  }}
                >
                  Sign in with Credentials
                </button>
              </form>
              <Link href="/auth/signup">
                <a>Don&apos;t have an account? Sign up here!</a>
              </Link>
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
