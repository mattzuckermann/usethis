import React, { ReactElement } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/client';

const LoggedOut = ({ path }: { path: string }): ReactElement => {
  return (
    <header>
      <h4>
        <Link href="/">
          <a>useThis.js</a>
        </Link>
      </h4>
      <nav>
        {/\/auth\/signin.*/.test(path) ? (
          <></>
        ) : (
          <button onClick={() => signIn()}>Login</button>
        )}
      </nav>
    </header>
  );
};

export default LoggedOut;
