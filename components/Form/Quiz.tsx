import React, { ReactElement, useState } from 'react';
import { Problem } from './Problem';
import { useMutation } from '@apollo/react-hooks';
import { ADD_RESULT } from '../../graphql/mutations/addResult';

type Problem = {
  question: string;
  image: string;
  choices: [{ answer: string }];
};
type Props = {
  user: {
    name: string;
    email: string;
    image: string;
  };
  problems: [Problem];
  slug: string;
};

export const Quiz = ({ user, problems, slug }: Props): ReactElement => {
  const nulledArray = new Array(problems.length).fill(null);
  const [answers, setAnswers] = useState<[number]>(nulledArray);
  const [addResult] = useMutation(ADD_RESULT);
  return (
    <section>
      {problems.map((problem: Problem, problemNumber: number) => (
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
