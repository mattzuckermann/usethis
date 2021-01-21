import React, { ReactElement } from 'react';
import Link from 'next/link';
import { getSession } from 'next-auth/client';
import { User } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { useQuery } from '@apollo/react-hooks';
import { GET_QUIZZES } from '../../graphql/queries/quizzes';

const Quizzes = ({ user }: { user: User }): ReactElement => {
  const { data, loading, error } = useQuery(GET_QUIZZES);

  return (
    <main className="layout">
      <h1>Quizzes:</h1>
      <hr />
      {loading ? (
        <section className="flex-centered card">LOADING...</section>
      ) : error ? (
        <section className="flex-centered card">Error</section>
      ) : (
        <section>
          {data?.quizzes.map((quiz: any) => {
            return (
              <div className="flex-centered card" key={quiz._id}>
                <h3>{quiz.name}</h3>
                <Link href={`/quizzes/${encodeURIComponent(quiz.slug)}`}>
                  <a className="no-decoration">
                    <img alt={quiz.slug} src={quiz.image} />
                  </a>
                </Link>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
};

export default Quizzes;

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
