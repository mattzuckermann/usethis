import Results from "./results";

export const resultsResolvers = {
  Query: {
    async results() {
      const allDocuments = await Results.find();
      return allDocuments;
    },
  },
};
