import gql from 'graphql-tag';

export const GET_QUIZZES = gql`
  query quizzes {
    quizzes {
      _id
      name
      slug
      problems {
        _id
      }
      image
    }
  }
`;
