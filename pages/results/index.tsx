import React, { ReactElement } from 'react';
import Link from 'next/link';
import { getSession } from 'next-auth/client';
import { User } from 'next-auth';
import { Result } from '../../src/@types/results';
import { GetServerSidePropsContext } from 'next';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_USER_RESULTS_BY_QUIZ = gql`
  query getUserResultsByQuiz {
    userResults(userEmail: "matt@mattzuckermann.dev") {
      _id
      results {
        _id
        answers
        dateCreated
      }
    }
  }
`;

const GET_QUIZ_ANSWERS = gql`
  query getQuizAnswers {
    quizzes {
      _id
      name
      slug
      problems {
        choices {
          answer
          isCorrect
        }
      }
    }
  }
`;

const Quizzes = ({ user }: { user: User }): ReactElement => {
  const queryMultiple = () => {
    const res1 = useQuery(GET_USER_RESULTS_BY_QUIZ, {
      variables: { userEmail: user.email },
    });
    const res2 = useQuery(GET_QUIZ_ANSWERS);
    return [res1, res2];
  };
  const [results, quizzes] = queryMultiple();
  const {
    data: resultsData,
    loading: resultsLoading,
    error: resultsError,
  } = results;
  const { data: quizzesData } = quizzes;

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

  return (
    <main className="layout">
      <h1>
        {user?.name
          ? `These are your test results, ${user.name}!`
          : `These are your test results!`}
      </h1>
      <hr />
      {resultsLoading ? (
        <section className="flex-centered card">LOADING...</section>
      ) : resultsError ? (
        <section className="flex-centered card">Error</section>
      ) : (
        <section className="flex-centered card">
          {quizzesData?.quizzes?.map((quiz, quizIndex: number) => {
            return (
              <div key={quizIndex}>
                <h2>&quot;{quiz.name}&quot; Quiz Results:</h2>
                {resultsData?.userResults[quizIndex].results.map(
                  (result: Result, index: string) => {
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
                  }
                )}
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
