import mongoose from 'mongoose';
import { Result } from '../../@types/results';
import Results from './results';

export const resultsResolvers = {
  Query: {
    async result(_: null, { _id }: { _id: string }): Promise<Result> {
      console.log(_id);
      const result = await Results.findOne({
        // _id,
        _id: new mongoose.Types.ObjectId(_id),
      });
      console.log(result);
      return result;
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
    async results(): Promise<Result[]> {
      const allResults = await Results.find();
      return allResults;
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
      const allUserQuizResults = await Results.find({
        userEmail,
        quizSlug,
      }).sort({ dateCreated: -1 });
      return allUserQuizResults;
    },
  },
};
