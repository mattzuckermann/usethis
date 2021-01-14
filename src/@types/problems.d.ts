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
  choices: Choice[];
  correctAnswers: number;
  image: string;
};
export type ProblemInput = {
  question: string;
  questionType: QuestionType;
  choices: Choice[];
  correctAnswers: number;
  image: string;
};
