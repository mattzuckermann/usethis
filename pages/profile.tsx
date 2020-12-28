import React, { ReactElement } from 'react';
import { getSession } from 'next-auth/client';
import { User } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import FormSection from '../components/Form/FormSection';

const Profile = ({ user }: { user: User }): ReactElement => {
  return (
    <main className="layout">
      <h1>
        {user?.name
          ? `This is your profile, ${user.name}!`
          : `This is your profile!`}
      </h1>
      <FormSection />
    </main>
  );
};

export default Profile;

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
