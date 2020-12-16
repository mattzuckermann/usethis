import Results from './results';
import { Result } from '../../@types/schema';

export const resultsMutations = {
  Mutation: {
    async addResult(
      _: null,
      {
        result,
      }: {
        result: {
          _id: string;
          score: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
        };
      }
    ): Promise<Result> {
      try {
        const newResult = await Results.create(result);
        return newResult;
      } catch (e) {
        console.log(e);
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
      } catch (e) {
        console.log(e);
      }
    },
  },
};
