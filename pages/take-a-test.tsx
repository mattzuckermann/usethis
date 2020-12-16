import React, { ReactElement } from 'react';
import { getSession } from 'next-auth/client';
import { User } from 'next-auth';
import { GetServerSidePropsContext } from 'next';

const TakeATest = ({ user }: { user: User }): ReactElement => {
  return (
    <div className="layout">
      <h1>{user?.name ? `Let's test, ${user.name}!` : `Let's test!`}</h1>
    </div>
  );
};

export default TakeATest;

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
