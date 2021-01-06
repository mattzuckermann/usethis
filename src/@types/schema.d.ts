/* Users Schema */
export type User = {
  _id: string;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

/* Results Schema */
export type Result = {
  _id: string;
  score: number;
};

/* Problems Schema */
enum QuestionType {
  MULTICHOICE,
  MULTIANSWER,
  TRUEFALSE,
  FILLBLANK,
}

type Choice = {
  answer: string;
  isCorrect: boolean;
};

export type Problem = {
  _id: string;
  question: string;
  questionType: QuestionType;
  choices: [Choice];
  correctAnswers: number;
  image: string;
};

export type ProblemInput = {
  question: string;
  questionType: QuestionType;
  choices: [Choice];
  correctAnswers: number;
  image: string;
};
