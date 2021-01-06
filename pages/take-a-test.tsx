import React, { ReactElement } from 'react';
import { getSession } from 'next-auth/client';
import { User } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_ALL_PROBLEMS = gql`
  query getAllProblems {
    problems {
      _id
      question
      questionType
      choices {
        answer
      }
      correctAnswers
      image
    }
  }
`;

const TakeATest = ({ user }: { user: User }): ReactElement => {
  const { data, loading, error } = useQuery(GET_ALL_PROBLEMS);
  return (
    <main className="layout">
      <h1>{user?.name ? `Let's test, ${user.name}!` : `Let's test!`}</h1>
      <hr />
      {loading ? (
        <section>LOADING...</section>
      ) : error ? (
        <section>Error</section>
      ) : (
        <section>
          {data.problems.map(
            (
              problem: {
                question: string;
                image: string;
                choices: [{ answer: string }];
              },
              problemNumber: number
            ) => (
              <div
                key={problemNumber}
                style={{
                  margin: '12rem',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <form>
                  <h4>Problem #{problemNumber + 1}</h4>
                  <p>{problem.question}</p>
                  <img
                    alt={`question-${problemNumber}`}
                    width="500"
                    src={problem.image}
                  />
                  <ul>
                    {problem.choices.map(
                      (choice: { answer: string }, choiceNumber: number) => (
                        <li key={choiceNumber} className="radio-wrapper">
                          <input
                            type="radio"
                            name={`question-${problemNumber}`}
                            value={`${choiceNumber}`}
                          />
                          <label htmlFor={`question-${problemNumber}`}>
                            <p>{choice.answer}</p>
                          </label>
                        </li>
                      )
                    )}
                  </ul>
                </form>
              </div>
            )
          )}
        </section>
      )}
    </main>
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
