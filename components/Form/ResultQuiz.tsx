import React, { useState, ReactElement } from 'react';
import { ResultScore } from '../../components/Form/ResultScore';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
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
type Result = {
  _id: string;
  userEmail: string;
  answers: number[];
  dateCreated: Date;
};
type Quiz = {
  name: string;
  problems: Problems;
  results: Result[];
};
type Props = {
  quiz: Quiz;
  quizIndex: number;
};

export const ResultQuiz = ({ quiz, quizIndex }: Props): ReactElement => {
  const [isToggled, setIsToggled] = useState(false);
  quizIndex = quizIndex + 1;
  return (
    <article>
      <h2
        role="button"
        tabIndex={0}
        aria-expanded={isToggled}
        className={classNames({ openDrawer: isToggled })}
        onClick={() => setIsToggled(!isToggled)}
        onKeyPress={(e) => {
          e.preventDefault();
          if (e.key === ' ' || e.key === 'Enter') setIsToggled(!isToggled);
        }}
        aria-controls={`quiz-${quizIndex}`}
      >
        {quiz.name}
      </h2>

      {/* Map through user's results of the currently mapped quiz */}
      <AnimatePresence>
        {isToggled && (
          <motion.ul
            id={`quiz-${quizIndex}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {quiz.results.map((result: Result, index: number) => {
              return (
                <ResultScore
                  key={index}
                  result={result}
                  problems={quiz.problems}
                />
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </article>
  );
};
