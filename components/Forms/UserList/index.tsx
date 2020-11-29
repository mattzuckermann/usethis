import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      username
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
        <List>
          {data?.users.map(
            (
              user: {
                username: string;
                date_joined: string;
              },
              index: string
            ) => {
              const { username, date_joined } = user;
              // const date_joined = new Date(user.date_joined);
              return (
                <ListItem key={index}>
                  <ListItemText>
                    {index + 1}. {username}{" "}
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
