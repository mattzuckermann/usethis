import React, { ReactElement } from 'react';
import Link from 'next/link';
const VerifyRequest = (): ReactElement => {
  return (
    <main className="layout">
      <h5>
        An email has been sent to you. Please click on the verification link to
        finish logging in. Be sure to also check your spam folder.
      </h5>
      <div>
        <Link href="/">
          <a>Back to home page</a>
        </Link>
      </div>
    </main>
  );
};

export default VerifyRequest;
