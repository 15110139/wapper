import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context' 
const graphqlUrl = 'https://graphql-crud-server.herokuapp.com/graphql'
const socketEndpoint = 'ws://graphql-crud-server.herokuapp.com/graphql'


const httpLink = new HttpLink({
    uri: graphqlUrl
})
const wsLink = new WebSocketLink({
    uri: socketEndpoint,
    options: {
        reconnect: true
    }
})
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "access-token": localStorage.getItem('TOKEN') ? `${localStorage.getItem('TOKEN')}` : ``
        }
    }
})
const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
    }, wsLink, httpLink
)
const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache()
})

export default client
