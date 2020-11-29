import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import Head from "next/head";
import fetch from "isomorphic-unfetch";

type WithApolloProps = {
  apolloClient: {
    ctx: {};
  };
  apolloState: {};
  pageProps: {};
};

export function withApollo(PageComponent: any) {
  const WithApollo = ({
    apolloClient,
    apolloState,
    ...pageProps
  }: WithApolloProps) => {
    const client = apolloClient || initApolloClient(apolloState);

    return (
      <ApolloProvider client={client as any}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  WithApollo.getInitialProps = async (ctx: {
    AppTree: {};
    apolloClient: {};
    res: { finished: boolean };
  }) => {
    const { AppTree } = ctx;
    const apolloClient = (ctx.apolloClient = initApolloClient());

    let pageProps = {};
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    // If on server
    if (typeof window === "undefined") {
      if (ctx.res && ctx.res.finished) {
        return pageProps;
      }

      try {
        const { getDataFromTree } = await import("@apollo/react-ssr");
        await getDataFromTree(
          <AppTree
            pageProps={{
              ...pageProps,
              apolloClient,
            }}
          />
        );
      } catch (e) {
        console.error(e);
      }
      Head.rewind();
    }

    const apolloState = apolloClient.cache.extract();
    return {
      ...pageProps,
      apolloState,
    };
  };

  return WithApollo;
}

const initApolloClient = (initialState = {}) => {
  const isDev = process.env.NODE_ENV !== "production";
  const url = isDev ? "http://localhost:3000" : "https://usethis.dev";

  const ssrMode = typeof window === "undefined";
  const link = new createHttpLink({
    uri: `${url}/api/graphql`,
    fetch,
  });
  const cache = new InMemoryCache().restore(initialState);

  const client = new ApolloClient({
    ssrMode,
    link,
    cache,
  });

  return client;
};
