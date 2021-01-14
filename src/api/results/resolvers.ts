import Results from './results';
import { Result } from '../../@types/results';

export const resultsResolvers = {
  Query: {
    async results(): Promise<Result[]> {
      const allResults = await Results.find();
      return allResults;
    },
    async userResults(
      _: null,
      { userEmail }: { userEmail: string }
    ): Promise<Result[]> {
      const allUserResults = await Results.find({ userEmail });
      return allUserResults;
    },
    async quizResults(
      _: null,
      { quizSlug }: { quizSlug: string }
    ): Promise<Result[]> {
      const allQuizResults = await Results.find({ quizSlug });
      return allQuizResults;
    },
    async userQuizResults(
      _: null,
      { userEmail, quizSlug }: { userEmail: string; quizSlug: string }
    ): Promise<Result[]> {
      const allUserQuizResults = await Results.find({ userEmail, quizSlug });
      return allUserQuizResults;
    },
  },
};
