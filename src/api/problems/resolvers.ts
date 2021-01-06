import Problems from './problems';
import { Problem } from '../../@types/schema';

export const problemsResolvers = {
  Query: {
    async problems(): Promise<Problem[]> {
      const allProblems = await Problems.find();
      return allProblems;
    },
  },
};
