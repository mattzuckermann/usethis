import React from "react";
import Link from "next/link";
const VerifyRequest = () => {
  return (
    <div className="layout">
      <div>
        An email has been sent to you. Please click on the verification link to
        finish logging in.
      </div>

      <div>
        <Link href="/">
          <a>Back to home page</a>
        </Link>
      </div>
    </div>
  );
};

export default VerifyRequest;
