import {gql} from '@apollo/client';

export const DELETE_USER = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id) {
            id, username, age, password
        }
    }
`;

export const CREATE_USER = gql`
    mutation CreateUser($input: UserInput!) {
        registerUser(input: $input) {
            id
            username
            age
            password
        }
    }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password)
  }
`;