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
    async removeResult(obj, { _id }, context) {
      try {
        await Results.deleteOne({ _id });
        console.log(`Deleted Result ${_id}`);
        return `Deleted Result ${_id}`;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
