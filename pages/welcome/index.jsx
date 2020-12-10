import React, { useEffect } from "react";
import { getSession } from "next-auth/client";

const index = () => {
  useEffect(() => {
    setTimeout(function () {
      location.replace("/study");
    }, 5000);
  }, []);
  return (
    <div className="layout">
      <div>
        Welcome to useThis.js! You will automatically be directed to the study
        page in five seconds to get started!
      </div>
    </div>
  );
};

export default index;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
    return {};
  }

  return {
    props: {
      user: session.user,
    },
  };
}
