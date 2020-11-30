import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
        <List>
          {data?.results.map(
            (result: { _id: string; score: number }, index: string) => {
              const { _id, score } = result;
              return (
                <ListItem key={index}>
                  <ListItemText>
                    {index + 1}. {score}/100{" "}
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
                  </ListItemText>
                </ListItem>
              );
            }
          )}
        </List>
      )}
    </div>
  );
};

export default index;
