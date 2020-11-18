import Users from "./users";

export const usersMutations = {
  Mutation: {
    async addUser(obj, { user }, context) {
      try {
        const newUser = await Users.create(user);
        return newUser;
      } catch (e) {
        console.log(e);
      }
    },
    async removeUser(obj, { _id }, context) {
      try {
        let deletedUser = await Users.findOne({ _id });
        await Users.deleteOne({ _id });
        console.log(`
========================================
Deleted User ID ${_id}
========================================
`);
        return deletedUser;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
