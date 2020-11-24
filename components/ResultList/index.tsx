import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

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

const index = () => {
  const { data, loading, error } = useQuery(GET_ALL_RESULTS);
  const [removeResult] = useMutation(REMOVE_RESULT, {
    refetchQueries: ["getAllResults"],
  });
  return (
    <div>
      {loading ? (
        <section>LOADING...</section>
      ) : (
        <section>
          <h1>RESULTS</h1>
          {data?.results.map(
            (result: { _id: string; score: number }, index: string) => {
              const { _id, score } = result;
              return (
                <div key={index}>
                  <span>{index + 1}. ) </span>
                  <span>{_id} </span>
                  <span>{score} / 100 </span>
                  <span>
                    <button
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
                  </span>
                  <br></br>
                </div>
              );
            }
          )}
        </section>
      )}
    </div>
  );
};

export default index;
