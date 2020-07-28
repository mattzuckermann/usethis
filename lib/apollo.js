import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

export function withApollo(PageComponent) {
  const WithApollo = (props) => {
    const client = new ApolloClient({
      uri: "http://localhost:3000/api/graphql",
    });
    return (
      
      <ApolloProvider client={client}>
        <PageComponent {...props} />
      </ApolloProvider>
    );
  };

  return WithApollo;
}