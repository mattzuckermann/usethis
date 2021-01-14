import React, { ReactElement } from 'react';
import { Choice } from './Choice';

type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);
export const Problem = ({
  problem,
  problemNumber,
  answers,
  setAnswers,
}: {
  problem: {
    question: string;
    image: string;
    choices: [{ answer: string }];
  };
  problemNumber: number;
  answers: [number | null];
  setAnswers: Dispatch<SetStateAction<[number | null]>>;
}): ReactElement => {
  return (
    <div className="card flexCentered">
      <form>
        <h3>Problem #{problemNumber + 1}</h3>
        <p>{problem.question}</p>
        <img alt={`question-${problemNumber}`} src={problem.image} />
        {/* List of possible answers to the question */}
        <ul>
          {problem.choices.map(
            (choice: { answer: string }, choiceNumber: number) => {
              const choiceProps = {
                problemNumber,
                choiceNumber,
                choice,
                answers,
                setAnswers,
              };
              return <Choice key={choiceNumber} {...choiceProps} />;
            }
          )}
        </ul>
      </form>
    </div>
  );
};
