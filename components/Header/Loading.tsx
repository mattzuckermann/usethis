import React, { ReactElement } from 'react';
import Link from 'next/link';

const Loading = (): ReactElement => {
  return (
    <header>
      <h4>
        <Link href="/">
          <a>useThis.js</a>
        </Link>
      </h4>
      <nav />
    </header>
  );
};

export default Loading;
