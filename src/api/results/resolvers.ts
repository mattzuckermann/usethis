import mongoose from 'mongoose';
import { Result } from '../../@types/results';
import Results from './results';

export const resultsResolvers = {
  Query: {
    async result(_: null, { _id }: { _id: string }): Promise<Result> {
      const result = await Results.findOne({
        _id: new mongoose.Types.ObjectId(_id),
      });
      return result;
    },
    async results(): Promise<Result[]> {
      const allResults = await Results.find();
      // @ts-ignore
      return allResults;
    },
    async quizResults(
      _: null,
      { quizSlug }: { quizSlug: string }
    ): Promise<Result[]> {
      const allQuizResults = await Results.find({ quizSlug });
      // @ts-ignore
      return allQuizResults;
    },
    async userResults(
      _: null,
      { userEmail }: { userEmail: string }
    ): Promise<Result[]> {
      const allUserResults = await Results.aggregate([
        { $match: { userEmail } },
        { $sort: { dateCreated: -1 } },
        {
          $group: {
            _id: '$quizSlug',
            results: {
              $addToSet: {
                _id: '$_id',
                answers: '$answers',
                dateCreated: '$dateCreated',
              },
            },
          },
        },
      ]);
      return allUserResults;
    },
    async userQuizResults(
      _: null,
      { userEmail, quizSlug }: { userEmail: string; quizSlug: string }
    ): Promise<Result[]> {
      const allUserQuizResults = await Results.find({
        userEmail,
        quizSlug,
      }).sort({ dateCreated: -1 });
      // @ts-ignore
      return allUserQuizResults;
    },
  },
};
