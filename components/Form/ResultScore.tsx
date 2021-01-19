import React, { ReactElement } from 'react';
import Link from 'next/link';

type Result = {
  _id: string;
  userEmail: string;
  answers: number[];
  dateCreated: Date;
};
type Problems = [
  {
    choices: [
      {
        answer: string;
        isCorrect: boolean;
      }
    ];
  }
];
type Props = {
  result: Result;
  problems: Problems;
};
type TimeFormatting = (dateCreated: Date) => string[];
type QuizPercentage = (userAnswer: number[], quizProblems: Problems) => string;

const getDate: TimeFormatting = (dateCreated) =>
  new Date(dateCreated).toLocaleDateString('en-US').split('/');
const getTime: TimeFormatting = (dateCreated) =>
  new Date(dateCreated).toLocaleTimeString('en-US').split(/:| /);
const calculateQuizPercentage: QuizPercentage = (userAnswers, problems) => {
  let answersCorrect = 0;
  userAnswers.forEach((userAnswer, index) => {
    if (problems[index].choices[userAnswer].isCorrect) answersCorrect++;
  });
  return `${(answersCorrect / problems.length) * 100}%`;
};

export const ResultScore = ({ result, problems }: Props): ReactElement => {
  const { _id, answers, dateCreated } = result;
  // Time Formatting
  const [month, date, year] = getDate(dateCreated);
  const [hour, minute, second] = getTime(dateCreated);
  // Calculating each of the user's results by percentage
  const quizPercentage = calculateQuizPercentage(answers, problems);
  return (
    <div>
      <Link href={`/results/${_id}`}>
        <a>
          {`${month}/${date}/${year} at ${hour}:${minute}:${second} - Score: ${
            quizPercentage ? quizPercentage : ''
          }`}
        </a>
      </Link>
    </div>
  );
};
