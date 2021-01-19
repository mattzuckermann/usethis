import gql from 'graphql-tag';

export const GET_QUIZZES_TAKEN_BY_USER = gql`
  query quizzesTakenByUser($userEmail: String) {
    quizzesTakenByUser(userEmail: $userEmail) {
      name
      problems {
        choices {
          answer
          isCorrect
        }
      }
      results {
        _id
        userEmail
        answers
        dateCreated
      }
    }
  }
`;
