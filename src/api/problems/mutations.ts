import Problems from './problems';
import { ProblemInput, Problem } from '../../@types/problems';

export const problemsMutations = {
  Mutation: {
    async addProblem(
      _: null,
      {
        problem,
      }: {
        problem: ProblemInput;
      }
    ): Promise<Problem> {
      try {
        const newProblem = await Problems.create(problem);
        return newProblem;
      } catch (err) {
        console.log(err);
      }
    },
    async removeProblem(_: null, { _id }: { _id: string }): Promise<Problem> {
      try {
        const deletedResult = await Problems.findOne({ _id });
        if (deletedResult) {
          await Problems.deleteOne({ _id });
        }
        return deletedResult;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
