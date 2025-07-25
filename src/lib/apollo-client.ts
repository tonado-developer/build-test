import { ApolloClient, InMemoryCache, NormalizedCacheObject, HttpLink, ApolloLink } from '@apollo/client'

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
    link: ApolloLink.from([httpLink]),
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-first', // statt no-cache
        errorPolicy: 'all'
      }
    }
  })

export default apolloClient;