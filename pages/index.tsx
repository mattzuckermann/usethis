import Head from "next/head";
import Layout from "../components/Layout";
import { withApollo } from "../lib/apollo";
import { useRef, useState, FC } from "react";
import { useSpring, useChain, animated, config } from "react-spring";
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

const ADD_RESULT = gql`
  mutation addResult($result: ResultInput) {
    addResult(result: $result) {
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

const ADD_USER = gql`
  mutation addUser($user: UserInput) {
    addUser(user: $user) {
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

const Home: FC = () => {
  const { data, loading, error } = useQuery(GET_ALL_RESULTS);
  const { data: dataU, loading: loadingU, error: errorU } = useQuery(
    GET_ALL_USERS
  );
  const [addResult] = useMutation(ADD_RESULT, {
    refetchQueries: ["getAllResults"],
  });
  const [removeResult] = useMutation(REMOVE_RESULT, {
    refetchQueries: ["getAllResults"],
  });
  const [addUser] = useMutation(ADD_USER, {
    refetchQueries: ["getAllUsers"],
  });
  const [removeUser] = useMutation(REMOVE_USER, {
    refetchQueries: ["getAllUsers"],
  });

  function useThis() {
    return "learning to use the JavaScript 'this' keyword in a variety of contexts";
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [score, setScore] = useState(0);

  const fadeRef = useRef(null!);
  const fade = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: config.slow,
    ref: fadeRef,
  });

  const translateRef = useRef(null!);
  const translate = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: config.molasses,
    ref: translateRef,
  });

  const slideRef = useRef(null!);
  const slide = useSpring({
    from: { opacity: 0, transform: "translateY(-100%)" },
    opacity: 1,
    transform: "translateY(0%)",
    config: config.slow,
    ref: slideRef,
  });

  useChain(
    [
      { current: fadeRef.current },
      { current: translateRef.current },
      { current: slideRef.current },
    ],
    [1.25, 2.0, 2.7]
  );

  return (
    <Layout>
      <animated.div style={fade}>
        <div className="container">
          <Head>
            <title>useThis</title>
            <link rel="icon" href="/favicon.svg" />
          </Head>

          <main>
            <div>
              <div>
                <animated.div style={translate}>
                  <img
                    style={{
                      top: "290px",
                      right: "400px",
                      position: "absolute",
                      width: "60px",
                    }}
                    src="/JavaScript-logo.png"
                  />
                </animated.div>
                <h1 className="title">
                  &lt;<span>useThis</span>/&gt;
                </h1>
              </div>
              <br />
              <animated.div style={slide}>
                <code
                  style={{ fontSize: "20px" }}
                >{`${useThis.toString()}`}</code>
              </animated.div>
            </div>
          </main>

          <h1>ADD USER</h1>
          <section>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const date_joined = new Date();
                addUser({
                  variables: {
                    user: {
                      username,
                      password,
                      date_joined,
                    },
                  },
                });
                setUsername("");
                setPassword("");
              }}
            >
              <div>
                <label htmlFor="username">Username:</label>
              </div>
              <input
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="username"
                style={{ marginBottom: "10px" }}
              />
              <div>
                <label htmlFor="password">Password:</label>
              </div>
              <input
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                style={{ marginBottom: "10px" }}
              />
              <div>
                <input
                  type="submit"
                  value="Submit"
                  disabled={!username || !password}
                />
              </div>
            </form>
          </section>
          {loadingU ? (
            <section>LOADING...</section>
          ) : (
            <section>
              <h1>USERS</h1>
              {dataU?.users.map(
                (
                  user: {
                    _id: string;
                    username: string;
                    password: string;
                    date_joined: Date;
                  },
                  index: string
                ) => {
                  const { _id, username, date_joined } = user;
                  return (
                    <div key={_id}>
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
          {/* NEXT FORM */}
          <h1 style={{ marginTop: "80px" }}>ADD RESULT</h1>
          <section>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addResult({
                  variables: {
                    result: {
                      score,
                    },
                  },
                });
                setScore(0);
              }}
            >
              <div>
                <label htmlFor="score">Score:</label>
              </div>
              <input
                name="score"
                placeholder="Score"
                value={score}
                type="number"
                onChange={(e) => setScore(parseInt(e.target.value))}
              />
              <div>
                <input type="submit" value="Submit" disabled={!score} />
              </div>
            </form>
          </section>

          {loading ? (
            <section>LOADING...</section>
          ) : (
            <section>
              <h1>RESULTS</h1>
              {data?.results.map(
                (result: { _id: string; score: number }, index: string) => {
                  const { _id, score } = result;
                  return (
                    <div key={_id}>
                      <span>{index + 1}. ) </span>
                      <span>{_id} </span>
                      <span>{score} </span>
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
          <footer>
            &copy;{new Date().getFullYear()} Matt Zuckermann. All Rights
            Reserved.
          </footer>

          <style jsx>{`
            code {
              color: white;
            }
            .container {
              background-image: url("/background.png");
              background-size: cover;
              min-height: 100vh;
              padding: 0 0.5rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            main {
              padding: 5rem 0;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            footer {
              width: 100%;
              height: 100px;
              border-top: 1px solid #eaeaea;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            footer a {
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .title {
              margin: 0;
              color: white;
              line-height: 1.15;
              font-size: 9rem;
              font-family: "Menlo";
              text-align: center;
            }

            code {
              border-radius: 5px;
              padding: 0.75rem;
              font-size: 1.1rem;
              font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
                monospace;
            }
          `}</style>

          <style jsx global>{`
            html,
            body {
              scroll-behavior: smooth;
              background-position: center;
              background-image: url("https://i.ya-webdesign.com/images/loading-png-gif.gif");
              background-size: 50px;
              background-repeat: no-repeat;
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }

            * {
              box-sizing: border-box;
            }
          `}</style>
        </div>
      </animated.div>
    </Layout>
  );
};

export default withApollo(Home);
