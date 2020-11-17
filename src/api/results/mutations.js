import Results from "./results";

export const resultsMutations = {
  Mutation: {
    async addResult(obj, { result }, context) {
      try {
        const newResult = await Results.create(result);
        return newResult;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
