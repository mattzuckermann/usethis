export type Result = {
  _id: string;
  userEmail: string;
  quizSlug: string;
  answers: number[];
  dateCreated: Date;
};
export type ResultInput = {
  userEmail: string;
  quizSlug: string;
  answers: number[];
  dateCreated: Date;
};
