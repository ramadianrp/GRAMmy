const { GraphQLError } = require('graphql');
const Post = require('../model/User');

const typeDefs = `#graphql
  type Post {
    _id: ID
    content: String!
    tags: String
    imgUrl: String
    authorId: ObjectId!
    comments: [
        content: String
        username: String
        createdAt: Date
        updatedAt: Date
    ]
    likes: [
        username: String
        createdAt: Date
        updatedAt: Date
    ]
    
  }

  type Query {
    posts: [Post]
  }

  type Mutation{
    addPost(content: String): Post
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