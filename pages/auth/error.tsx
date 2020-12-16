import React, { ReactElement } from 'react';
import Link from 'next/link';

const error = (): ReactElement => {
  return (
    <main className="layout">
      <h1>An error has ocurred.</h1>
      <div>
        <Link href="/">
          <a>Back to home page</a>
        </Link>
      </div>
    </main>
  );
};

export default error;
