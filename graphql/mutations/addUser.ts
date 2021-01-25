import gql from 'graphql-tag';

export const ADD_USER = gql`
  mutation addUser($user: UserInput) {
    addUser(user: $user) {
      _id
      name
      email
      password
      image
      createdAt
      updatedAt
    }
  }
`;
