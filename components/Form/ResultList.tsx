import React, { ReactElement } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_ALL_RESULTS = gql`
  query getAllResults {
    results {
      _id
      score
    }
  }
`;

const REMOVE_RESULT = gql`
  mutation removeResult($_id: ID!) {
    removeResult(_id: $_id) {
      _id
    }
  }
`;

const ResultList = (): ReactElement => {
  const { data, loading, error } = useQuery(GET_ALL_RESULTS);
  const [removeResult] = useMutation(REMOVE_RESULT, {
    refetchQueries: ['getAllResults'],
  });
  return (
    <div>
      {loading ? (
        <section>LOADING...</section>
      ) : error ? (
        <section>Error</section>
      ) : (
        <div>
          {data?.results.map(
            (result: { _id: string; score: number }, index: string) => {
              const { _id, score } = result;
              return (
                <div key={index}>
                  <div>
                    {index + 1}. {score}/100{' '}
                    <button
                      className="cancel"
                      onClick={() => {
                        try {
                          removeResult({
                            variables: {
                              _id,
                            },
                          });
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default ResultList;
