import { ReactElement } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/client';
import { User } from 'next-auth';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Quiz } from '../../components/Form/Quiz';

const GET_QUIZ_PROBLEMS = gql`
  query getQuizProblems($slug: String) {
    quiz(slug: $slug) {
      name
      problems {
        choices {
          answer
        }
        image
        question
      }
      category
      image
      dateCreated
    }
  }
`;

const QuizSet = ({ user }: { user: User }): ReactElement => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_QUIZ_PROBLEMS, {
    variables: { slug: router.query.slug },
  });
  return (
    <main className="layout">
      <h1>{user?.name ? `Let's test, ${user.name}!` : `Let's test!`}</h1>
      <hr />
      {loading ? (
        <section className="flex-centered card">LOADING...</section>
      ) : error ? (
        <section className="flex-centered card">Error</section>
      ) : (
        <Quiz
          user={user}
          problems={data.quiz.problems}
          slug={router.query.slug}
        />
      )}
    </main>
  );
};

export default QuizSet;

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
