import Users from "./users";

export const usersMutations = {
  Mutation: {
    async addUser(
      obj: {},
      {
        user,
      }: {
        user: {
          _id: string;
          name: string;
          email: string;
          image: string;
          createdAt: Date;
          updatedAt: Date;
        };
      },
      context: {}
    ) {
      try {
        const newUser = await Users.create(user);
        await console.log(`
====================
Added User ${user.name}
====================
`);
        return newUser;
      } catch (e) {
        console.log(e);
      }
    },
    async removeUser(obj: {}, { email }: { email: string }, context: {}) {
      try {
        let deletedUser = (await Users.findOne({ email })) || {
          _id: "user doesn't exist",
          name: "user doesn't exist",
          email: "user doesn't exist",
          image: "user doesn't exist",
        };
        if (deletedUser) {
          await Users.deleteOne({ email });
          console.log(`
========================================
Deleted User ${email}
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
