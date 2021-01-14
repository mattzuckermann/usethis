type CollectionReference = { _id: string };

export type Quiz = {
  _id: string;
  name: string;
  category: string;
  dateCreated: Date;
  problems: Problem[];
  results: CollectionReference[];
};
export type QuizInput = {
  name: string;
  category: string;
  dateCreated: Date;
  problems: [ProblemInput | null];
};
