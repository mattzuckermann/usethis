import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      _id
      username
      password
      date_joined
    }
  }
`;

const REMOVE_USER = gql`
  mutation removeUser($username: String!) {
    removeUser(username: $username) {
      _id
      username
      password
      date_joined
    }
  }
`;

const index = () => {
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [removeUser] = useMutation(REMOVE_USER, {
    refetchQueries: ["getAllUsers"],
  });
  return (
    <div>
      {loading ? (
        <section>LOADING...</section>
      ) : (
        <section>
          <h1>USERS</h1>
          {data?.users.map(
            (
              user: {
                _id: string;
                username: string;
                password: string;
                date_joined: string;
              },
              index: string
            ) => {
              const { _id, username, date_joined } = user;
              return (
                <div key={index}>
                  <span>{index + 1}. ) </span>
                  <span>{_id} </span>
                  <span>{username} </span>
                  <span>{date_joined} </span>
                  <span>
                    <button
                      onClick={() => {
                        try {
                          removeUser({
                            variables: {
                              username,
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
