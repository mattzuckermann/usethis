import React, { ReactElement } from 'react';
import { getSession } from 'next-auth/client';
import { User } from 'next-auth';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import AbsoluteBlock from '../../components/AbsoluteBlock';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

const GET_RESULT = gql`
  query getResult($_id: ID!) {
    result(_id: $_id) {
      _id
      userEmail
      quizSlug
      answers
      dateCreated
    }
  }
`;

const Profile = ({ user }: { user: User }): ReactElement => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_RESULT, {
    variables: {
      _id: router.query.slug,
    },
  });
  return (
    <main className="layout">
      <h1>
        {user?.name
          ? `These are your test results, ${user.name}!`
          : `These are your test results!`}
      </h1>
      <hr />
      <section className="container">
        {loading ? (
          <div className="card">LOADING</div>
        ) : error ? (
          <div className="card">ERROR</div>
        ) : (
          <div className="card">
            <p>{data?.result._id}</p>
            <p>{data?.result.userEmail}</p>
            <p>{data?.result.quizSlug}</p>
            <p>
              {data?.result.answers.map((answer, index) => {
                return <p key={index}>{answer}</p>;
              })}
            </p>
            <p>{data?.result.dateCreated}</p>
            <br />
            <Link href="/results">
              <a>Back to all results</a>
            </Link>
          </div>
        )}
        <AbsoluteBlock />
      </section>
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
