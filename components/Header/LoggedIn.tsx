import React, { ReactElement } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/client';
import { User } from 'next-auth';

const LoggedIn = ({ user }: { user: User }): ReactElement => {
  return (
    <header>
      <h4>
        <Link href="/">
          <a>useThis.js</a>
        </Link>
      </h4>
      <nav>
        <Link href="/study">
          <a>Study</a>
        </Link>
        <Link href="/take-a-test">
          <a>Test</a>
        </Link>
        <Link href="/profile">
          <a>
            <img
              className="avatar"
              src={user.image === null ? '/profileIcon.png' : user.image}
              alt="profile_avatar"
            />
          </a>
        </Link>
        <a>
          <button onClick={() => signOut()}>Logout</button>
        </a>
      </nav>
    </header>
  );
};

export default LoggedIn;
