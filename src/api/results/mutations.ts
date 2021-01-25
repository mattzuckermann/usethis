import Results from './results';
import Quizzes from '../quizzes/quizzes';
import { ResultInput, Result } from '../../@types/results';

export const resultsMutations = {
  Mutation: {
    async addResult(
      _: null,
      {
        result,
      }: {
        result: ResultInput;
      }
    ): Promise<Result> {
      try {
        // @ts-ignore
        const newResult: Result = await Results.create(result);
        // Add result to corresponding quiz
        await Quizzes.updateOne(
          { slug: newResult.quizSlug },
          // @ts-ignore
          { $push: { results: newResult } },
          { new: true }
        );
        return newResult;
      } catch (err) {
        console.log(err);
      }
    },
    async removeResult(_: null, { _id }: { _id: string }): Promise<Result> {
      try {
        const deletedResult = (await Results.findOne({ _id })) || {
          _id: "result doesn't exist",
          score: 0,
        };
        if (deletedResult) {
          await Results.deleteOne({ _id });
          console.log(`
==========================================
Deleted Result ID ${_id}
==========================================
`);
        }
        return deletedResult;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
