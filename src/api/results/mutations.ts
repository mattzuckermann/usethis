import Results from './results';
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
        const newResult = await Results.create(result);
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
