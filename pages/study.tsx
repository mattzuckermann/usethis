import React, { ReactElement } from 'react';
import { getSession } from 'next-auth/client';
import { User } from 'next-auth';
import { GetServerSidePropsContext } from 'next';

const Study = ({ user }: { user: User }): ReactElement => {
  return (
    <main className="layout">
      <h1>{user?.name ? `Let's study, ${user.name}!` : `Let's study!`}</h1>
    </main>
  );
};

export default Study;

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
