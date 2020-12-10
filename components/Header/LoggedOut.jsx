import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/client";

const LoggedOut = ({ path }) => {
  return (
    <header>
      <h4>
        <Link href="/">
          <a>useThis.js</a>
        </Link>
      </h4>
      <nav>
        {/\/auth\/signin.*/.test(path) || path === "/welcome" ? (
          <></>
        ) : (
          <a href="#" onClick={signIn}>
            Login
          </a>
        )}
      </nav>
    </header>
  );
};

export default LoggedOut;
