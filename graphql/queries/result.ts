import gql from 'graphql-tag';

export const GET_RESULT = gql`
  query result($_id: ID!) {
    result(_id: $_id) {
      _id
      userEmail
      quizSlug
      answers
      dateCreated
    }
  }
`;
