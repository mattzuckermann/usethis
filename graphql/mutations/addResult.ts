import gql from 'graphql-tag';

export const ADD_RESULT = gql`
  mutation addResult($result: ResultInput) {
    addResult(result: $result) {
      _id
      userEmail
      quizSlug
      answers
      dateCreated
    }
  }
`;
