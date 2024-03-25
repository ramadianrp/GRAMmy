const { GraphQLError } = require('graphql');
const User = require('../model/User');

const typeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]
    usersById(id: Int): User
  }

  type Mutation{
    addUser(name: String, username: String, email: String, password: String): User
  }
`;

const resolvers = {
    Query: {
        users: async () => {
            const users = await User.findAll();
            return users;
        },
    },
    Mutation: {
        addUser: async (_, { name, username, email, password }) => {
            const newUser = {
                name,
                username,
                email,
                password
            };
            const result = await User.createOne(newUser);

            newUser._id = result.insertedId;

            return newUser;
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};