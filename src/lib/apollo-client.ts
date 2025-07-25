import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
  fetch: function (uri, options) {
    return fetch(uri, {
      ...options ?? {},
      headers: {
        ...options?.headers ?? {},
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`
      }
    })
  }
})

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      new ApolloLink((operation, forward) => {
        console.log('🚀 GraphQL Query:', operation.operationName, operation.variables);
        return forward(operation).map((response) => {
          console.log('📦 GraphQL Response:', response.data);
          return response;
        });
      }),
      httpLink
    ])
  });

export default apolloClient;