import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/client";

const LoggedIn = ({ user }) => {
  return (
    <header>
      <h4>
        <Link href="/">
          <a>useThis.js</a>
        </Link>
      </h4>
      <nav>
        <Link href="/profile">
          <a>
            <img
              src={
                /^https:\/\/lh5\.google/.test(user.image) || user.image === null
                  ? "/profileIcon.png"
                  : user.image
              }
              style={{ width: "1.5rem", borderRadius: "1rem" }}
              alt="profile_avatar"
            />
          </a>
        </Link>
        <Link href="/study">
          <a>Study</a>
        </Link>
        <Link href="/test">
          <a>Test</a>
        </Link>
        <Link href="/kitchensink">
          <a>Kitchen Sink</a>
        </Link>
        <a href="#" onClick={signOut}>
          Logout
        </a>
      </nav>
    </header>
  );
};

export default LoggedIn;
