import Quizzes from './quizzes';
import { Quiz } from '../../@types/quizzes';
import { linkToExecutor } from 'graphql-tools';

export const quizzesResolvers = {
  Query: {
    async quiz(_: null, { slug }: { slug: string }): Promise<Quiz> {
      const quiz = await Quizzes.findOne({
        slug,
      }).populate('problems');
      return quiz;
    },
    async quizzes(): Promise<Quiz[]> {
      const allQuizzes = await Quizzes.find({})
        .sort({ dateCreated: -1 })
        .populate('problems');
      return allQuizzes;
    },
    async quizzesTakenByUser(
      _: null,
      { userEmail }: { userEmail: string }
    ): Promise<Quiz[]> {
      let quizzesTakenByUser = await Quizzes.find()
        .sort({ dateCreated: -1 })
        .populate('problems')
        .populate({
          path: 'results',
          match: {
            userEmail,
          },
          options: {
            sort: { dateCreated: -1 },
          },
        });
      quizzesTakenByUser = quizzesTakenByUser.filter(function (quiz) {
        return quiz.results.length !== 0;
      });
      return quizzesTakenByUser;
    },
  },
};
