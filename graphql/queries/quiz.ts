import gql from 'graphql-tag';

export const GET_QUIZ = gql`
  query quiz($slug: String) {
    quiz(slug: $slug) {
      name
      problems {
        choices {
          answer
        }
        image
        question
      }
      category
      image
      dateCreated
    }
  }
`;
