import React from "react";
import { getSession } from "next-auth/client";

type Props = {
  user: {
    email: string;
    image: string;
    name: string;
  };
};

const index = ({ user }: Props) => {
  console.log(user);
  return (
    <div className="layout">
      {user.profile
        ? `This is your profile, ${user.name}!`
        : "This is your profile!"}
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
