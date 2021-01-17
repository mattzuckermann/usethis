import React, { ReactElement } from 'react';
import Link from 'next/link';
import { getSession } from 'next-auth/client';
import { User } from 'next-auth';
import { Result } from '../../src/@types/results';
import { GetServerSidePropsContext } from 'next';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_QUIZZES_TAKEN_BY_USER = gql`
  query quizzesTakenByUser($userEmail: String) {
    quizzesTakenByUser(userEmail: $userEmail) {
      _id
      name
      slug
      problems {
        choices {
          answer
          isCorrect
        }
      }
      results {
        _id
        userEmail
        quizSlug
        answers
        dateCreated
      }
    }
  }
`;

const Quizzes = ({ user }: { user: User }): ReactElement => {
  console.log(user.email);
  const { data, loading, error } = useQuery(GET_QUIZZES_TAKEN_BY_USER, {
    variables: { userEmail: user.email },
  });

  const calculateQuizPercentage = (
    userAnswers: number[],
    quizProblems: [
      {
        choices: [
          {
            isCorrect: boolean;
          }
        ];
      }
    ]
  ): string => {
    let answersCorrect = 0;
    userAnswers.forEach((userAnswer, index) => {
      if (quizProblems && quizProblems[index].choices[userAnswer].isCorrect)
        answersCorrect++;
    });
    return quizProblems && `${(answersCorrect / quizProblems.length) * 100}%`;
  };
  console.log(data);
  return (
    <main className="layout">
      <h1>
        {user?.name
          ? `These are your test results, ${user.name}!`
          : `These are your test results!`}
      </h1>
      <hr />
      {loading ? (
        <section className="flex-centered card">LOADING...</section>
      ) : error ? (
        <section className="flex-centered card">Error</section>
      ) : (
        <section className="flex-centered card">
          {data.quizzesTakenByUser.map((quiz, quizIndex: number) => {
            return (
              <div key={quizIndex}>
                <h2>&quot;{quiz.name}&quot; Quiz Results:</h2>
                {quiz.results.map((result: Result, index: string) => {
                  const { _id, answers, dateCreated } = result;
                  const quizPercentage = calculateQuizPercentage(
                    answers,
                    quiz.problems
                  );

                  // Time Formatting
                  const [month, date, year] = new Date(dateCreated)
                    .toLocaleDateString('en-US')
                    .split('/');
                  const [hour, minute, second] = new Date(dateCreated)
                    .toLocaleTimeString('en-US')
                    .split(/:| /);

                  return (
                    <div key={index}>
                      <Link href={`/results/${_id}`}>
                        <a>
                          <p>
                            {`${month}/${date}/${year} at ${hour}:${minute}:${second} - Score: ${
                              quizPercentage ? quizPercentage : ''
                            }`}
                          </p>
                        </a>
                      </Link>
                    </div>
                  );
                })}
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
