import Quizzes from './quizzes';
import { Quiz } from '../../@types/quizzes';

export const quizzesResolvers = {
  Query: {
    async quizzes(): Promise<Quiz[]> {
      const allQuizzes = await Quizzes.find({}).populate('problems');
      return allQuizzes;
    },
    async quiz(_: null, { slug }: { slug: string }): Promise<Quiz> {
      const quiz = await Quizzes.findOne({
        slug,
      }).populate('problems');
      return quiz;
    },
  },
};
