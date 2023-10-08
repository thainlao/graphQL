import {gql} from '@apollo/client';

export const GET_ALL_USERS = gql`
    query {
        getAllUsers {
            id, username, age, password
        }
    }
`

export const GET_USER = gql`
  query {
    getUser {
      id
      username
      email
      age
      posts {
        id
        title
        content
      }
      role
    }
  }
`;