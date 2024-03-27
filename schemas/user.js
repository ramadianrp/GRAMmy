const { GraphQLError } = require('graphql');
const User = require('../model/User');
const { comparePass, hashPass } = require('../helpers/bycrpt');
const { signToken } = require('../helpers/jwt');

const typeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String!
    email: String!
    password: String!
  }

  type Token{
    accessToken: String
  }

  type Query {
    users: [User]
    findByUsername(username: String): User
    userById(_id: ID): User
  }

  type Mutation{
    register(name: String, username: String, email: String, password: String): User
    login(email: String, password: String): Token
  }
`;

const resolvers = {
    Query: {
        users: async () => {
            const users = await User.findAll();
            return users;
        },
        findByUsername: async (_, { username }) => {
            const user = await User.findByUsername(username);
            return user
        },
        userById: async (_, args) => {
            console.log(args, "<< args");
            const user = await User.findById(args._id);
            return user;
        }

    },
    Mutation: {
        login: async (_, args) => {
            try {
                const { email, password } = args
                const user = await User.findByEmail(email)
                if (!user) {
                    throw new Error('Invalid credentials (email/password) user')
                }

                const validated = comparePass(password, user.password);
                if (!validated) {
                    throw new Error('Invalid credentials (email/password) pass');
                }

                const token = {
                    accessToken: signToken({
                        id: user._id,
                        email: user.email
                    })
                }

                return token
            } catch (error) {
                console.log(error);
                throw error
            }
        },
        register: async (_, { name, username, email, password }) => {
            try {
                const newUser = {
                    name,
                    username,
                    email,
                    password: await hashPass(password)
                };
                const result = await User.createOne(newUser);

                newUser._id = result.insertedId;
                return newUser;
            } catch (error) {
                throw new GraphQLError('Registration failed');
            }

        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};