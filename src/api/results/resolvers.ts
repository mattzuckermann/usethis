import Results from './results';
import { Result } from '../../@types/schema';

export const resultsResolvers = {
  Query: {
    async results(): Promise<Result[]> {
      const allDocuments = await Results.find();
      return allDocuments;
    },
  },
};
