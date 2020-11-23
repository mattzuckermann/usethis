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
    async removeResult(obj: {}, { _id }: { _id: any }, context: {}) {
      try {
        let deletedResult = (await Results.findOne({ _id })) || {
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
