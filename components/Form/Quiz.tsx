import React, { ReactElement, useState } from 'react';
import { Problem } from './Problem';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

type ProblemType = {
  question: string;
  image: string;
  choices: [{ answer: string }];
};

const ADD_QUIZ_RESULTS = gql`
  mutation addResult($result: ResultInput) {
    addResult(result: $result) {
      _id
      userEmail
      quizSlug
      answers
      dateCreated
    }
  }
`;

export const Quiz = ({
  user,
  problems,
  slug,
}: {
  user: {
    name: string;
    email: string;
    image: string;
  };
  problems: [ProblemType];
  slug: string;
}): ReactElement => {
  const nulledArray = new Array(problems.length).fill(null);
  const [answers, setAnswers] = useState<[number]>(nulledArray);
  const [addResult] = useMutation(ADD_QUIZ_RESULTS);
  return (
    <section>
      {problems.map((problem: ProblemType, problemNumber: number) => (
        <Problem
          key={problemNumber}
          problem={problem}
          problemNumber={problemNumber}
          answers={answers}
          setAnswers={setAnswers}
        />
      ))}
      <button
        onClick={(e) => {
          e.preventDefault();
          addResult({
            variables: {
              result: {
                userEmail: user.email,
                quizSlug: slug,
                answers,
                dateCreated: new Date(),
              },
            },
          });
          setAnswers(nulledArray);
          window.location.replace(`/results`);
        }}
        disabled={answers.includes(null)}
      >
        Submit
      </button>
    </section>
  );
};
