const {buildSchema} = require('graphql')

const schema = buildSchema(`
    type User {
        id: ID
        username: String
        email: String
        password: String
        age: Int
        posts: [Post]
        role: String
    }

    type Post {
        id: ID
        title: String
        content: String
    }

    input UserInput {
        id: ID
        username: String!
        age: Int!
        password: String!
        posts: [PostInput]
    }

    input PostInput {
        id: ID
        title: String!
        content: String!
    }

    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }

    type Mutation {
        deleteUser(id: ID): User
        registerUser(input: UserInput!): User
        loginUser(username: String!, password: String!): String
    }
`);

module.exports = schema;