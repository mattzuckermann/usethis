import React, { ReactElement } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

const GET_USER_QUIZ_RESULTS = gql`
  query getUserQuizResults($userEmail: String, $quizSlug: String) {
    userQuizResults(userEmail: $userEmail, quizSlug: $quizSlug) {
      _id
      userEmail
      quizSlug
      answers
      dateCreated
    }
  }
`;

const GET_QUIZ_ANSWERS = gql`
  query getQuizAnswers($slug: String) {
    quiz(slug: $slug) {
      _id
      name
      slug
      problems {
        choices {
          isCorrect
          answer
        }
      }
      category
      image
      dateCreated
    }
  }
`;

export const ResultList = ({
  user,
}: {
  user: { name: string; email: string };
}): ReactElement => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_USER_QUIZ_RESULTS, {
    variables: {
      userEmail: user.email,
      quizSlug: router.query.slug,
    },
  });
  const { data: answersData } = useQuery(GET_QUIZ_ANSWERS, {
    variables: {
      slug: router.query.slug,
    },
  });
  const calculateQuizPercentage = (
    userAnswers: number[],
    quizProblems: [
      {
        choices: [
          {
            answer: number;
            isCorrect: boolean;
          }
        ];
      }
    ]
  ): string => {
    let answersCorrect = 0;
    userAnswers.forEach((userAnswer, index) => {
      if (quizProblems && quizProblems[index]?.choices[userAnswer].isCorrect)
        answersCorrect++;
    });
    return quizProblems && `${(answersCorrect / quizProblems.length) * 100}%`;
  };
  console.log(answersData);
  return (
    <div>
      {loading ? (
        <section>LOADING...</section>
      ) : error ? (
        <section>Error</section>
      ) : (
        <section>
          {data?.userQuizResults.map((result: Result, index: string) => {
            const { answers, dateCreated } = result;
            const quizPercentage = calculateQuizPercentage(
              answers,
              answersData?.quiz.problems
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
                <div>
                  {user.name} took the quiz &quot;
                  {answersData?.quiz.name}
                  &quot; on{' '}
                  {`${month}/${date}/${year} at ${hour}:${minute}:${second} `}
                  with a score of {quizPercentage ? quizPercentage : ''}
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};
