import gql from 'graphql-tag'


export const listUser = gql`
    query listUsers {
        users {
        id
        name
  }
}

`