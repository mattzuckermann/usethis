import React, { FC } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import Head from 'next/head';
import { NextPage } from 'next';
import fetch from 'isomorphic-unfetch';

export function withApollo(PageComponent: NextPage): FC {
  const WithApollo = ({
    apolloClient,
    apolloState,
    ...pageProps
  }: {
    apolloClient: {};
    apolloState: {};
    pageProps: string[];
  }) => {
    const client = apolloClient || initApolloClient(apolloState);

    return (
      // <ApolloProvider client={client}>
      <ApolloProvider client={client}>
        <PageComponent {...(pageProps as any)} />
      </ApolloProvider>
      // </ApolloProvider>
    );
  };

  WithApollo.getInitialProps = async (ctx) => {
    const { AppTree } = ctx;
    const apolloClient = (ctx.apolloClient = initApolloClient());

    let pageProps = {};
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    // If on server
    if (typeof window === 'undefined') {
      if (ctx.res && ctx.res.finished) {
        return pageProps;
      }

      try {
        const { getDataFromTree } = await import('@apollo/react-ssr');
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
  const isDev = process.env.NODE_ENV !== 'production';
  const url = isDev ? 'http://localhost:3000' : 'https://usethis.dev';

  const ssrMode = typeof window === 'undefined';
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

// ===============================================================================================
// ===============================================================================================
// ===============================================================================================

// import React from 'react';
// import {
//   // ApolloProvider,
//   ApolloClient,
//   createHttpLink,
//   InMemoryCache,
//   NormalizedCacheObject,
// } from '@apollo/client';
// import { ApolloProvider } from '@apollo/react-hooks';
// import Head from 'next/head';
// import { NextPage } from 'next';
// import fetch from 'isomorphic-unfetch';

// let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// export function withApollo<PageProps>(
//   PageComponent: NextPage<PageProps>,
//   { ssr = true } = {}
// ) {
//   type ApolloPageProps = PageProps & {
//     apolloClient?: ApolloClient<NormalizedCacheObject> | null;
//     apolloState?: NormalizedCacheObject;
//   };
//   const WithApollo: NextPage<ApolloPageProps> = ({
//     apolloClient,
//     apolloState,
//     ...pageProps
//   }) => {
//     const client = apolloClient || initApolloClient(apolloState);
//     return (
//       <ApolloProvider client={client}>
//         <PageComponent {...((pageProps as any) as PageProps)} />
//       </ApolloProvider>
//     );
//   };

//   WithApollo.getInitialProps = async (ctx) => {
//     const { AppTree } = ctx;
//     const apolloClient = (ctx.apolloClient = initApolloClient());

//     let pageProps = {};
//     if (PageComponent.getInitialProps) {
//       pageProps = await PageComponent.getInitialProps(ctx);
//     }

//     // If on server
//     if (typeof window === 'undefined') {
//       if (ctx?.res.writableEnded) {
//         return pageProps;
//       }

//       try {
//         const { getDataFromTree } = await import('@apollo/react-ssr');
//         await getDataFromTree(
//           <AppTree
//             pageProps={{
//               ...pageProps,
//               apolloClient,
//             }}
//           />
//         );
//       } catch (e) {
//         console.error(e);
//       }
//       Head.rewind();
//     }

//     const apolloState = apolloClient.cache.extract();
//     return {
//       ...pageProps,
//       apolloState,
//     };
//   };

//   return WithApollo;
// }

// const initApolloClient = (initialState = {}) => {
//   const isDev = process.env.NODE_ENV !== 'production';
//   const url = isDev ? 'http://localhost:3000' : 'https://usethis.dev';

//   const ssrMode = typeof window === 'undefined';
//   const link = new createHttpLink({
//     uri: `${url}/api/graphql`,
//     fetch,
//   });
//   const cache = new InMemoryCache().restore(initialState);

//   const client = new ApolloClient({
//     ssrMode,
//     link,
//     cache,
//   });

//   return client;
// };
