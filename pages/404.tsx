import React, { FC } from 'react';
import Link from 'next/link';

const NotFoundPage: FC = () => {
  return (
    <main className="layout">
      <h1>Oops! This page doesn&#39;t exist.</h1>
      <div>
        <Link href="/">
          <a>Back to home page</a>
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
