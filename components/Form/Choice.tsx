import React, { ReactElement } from 'react';

type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);
type ChoiceProps = {
  problemNumber: number;
  choiceNumber: number;
  choice: { answer: string };
  answers: [number | null];
  setAnswers: Dispatch<SetStateAction<[number | null]>>;
};

export const Choice = ({
  problemNumber,
  choiceNumber,
  choice,
  answers,
  setAnswers,
}: ChoiceProps): ReactElement => {
  const { answer } = choice;
  return (
    <li className="radio-wrapper">
      <input
        type="radio"
        name={`question-${problemNumber}`}
        value={choiceNumber}
        checked={answers[problemNumber] === choiceNumber}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          const newArrayState = answers.slice();
          newArrayState[problemNumber] = parseInt(target.value);
          setAnswers(newArrayState);
        }}
      />
      <label htmlFor={`question-${problemNumber}`}>
        <p>{answer}</p>
      </label>
    </li>
  );
};
