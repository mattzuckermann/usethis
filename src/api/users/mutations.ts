import Users from "./users";

export const usersMutations = {
  Mutation: {
    async addUser(obj, { user }, context) {
      try {
        const newUser = await Users.create(user);
        await console.log(`
====================
Added User ${user.username}
====================
`);
        return newUser;
      } catch (e) {
        console.log(e);
      }
    },
    async removeUser(obj: {}, { username }: { username: string }, context: {}) {
      try {
        let deletedUser = (await Users.findOne({ username })) || {
          _id: "user doesn't exist",
          username: "user doesn't exist",
          password: "user doesn't exist",
        };
        if (deletedUser) {
          await Users.deleteOne({ username });
          console.log(`
========================================
Deleted User ${username}
========================================
`);
        }
        return deletedUser;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
