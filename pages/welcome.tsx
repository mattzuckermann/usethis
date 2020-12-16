import React, { useEffect, ReactElement } from 'react';
import { getSession } from 'next-auth/client';
import { User } from 'next-auth';
import { GetServerSidePropsContext } from 'next';

const Welcome = ({ user }: { user: User }): ReactElement => {
  useEffect(() => {
    setTimeout(function () {
      location.replace('/study');
    }, 3000);
  }, []);
  return (
    <main className="layout">
      <h1>
        {user.name
          ? `Welcome to useThis.js, ${user.name}!`
          : `Welcome to useThis.js!`}
      </h1>
      <section>You will be directed to the study page shortly!</section>
    </main>
  );
};

export default Welcome;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<Record<string, never> | { props: { user: User } }> {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    return {};
  }

  return {
    props: {
      user: session.user,
    },
  };
}
