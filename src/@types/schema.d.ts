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
  MULTIPLECHOICE = 'MULTIPLECHOICE',
  MULTIPLEANSWER = 'MULTIPLEANSWER',
  FILLINTHEBLANK = 'FILLINTHEBLANK',
  TRUEFALSE = 'TRUEFALSE',
}

type Choice = {
  answer: string;
  isCorrect: boolean;
};

export type ProblemInput = {
  question: string;
  questionType: string;
  // questionType: [QuestionType];
  choices: [Choice];
  correctAnswers: number;
  image: string;
};

export type Problem = {
  _id: string;
  question: string;
  questionType: string;
  // questionType: [QuestionType];
  choices: [Choice];
  correctAnswers: number;
  image: string;
};
