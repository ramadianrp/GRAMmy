const { GraphQLError } = require('graphql');
const Post = require('../model/Post');

const typeDefs = `#graphql
  type Post {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID!
    comments: [ comments ]
    likes: [ likes ]
  }

  type likes{
    username: String
    createdAt: String
    updatedAt: String
  }

  type comments{
    content: String
    username: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    posts: [Post]
  }

  type Mutation{
    createPost(content: String, tags: [String], imgUrl: String, authorId: ID, comments: String, likes: String): Post
  }
`;

const resolvers = {
    Query: {
        posts: async () => {
            const users = await Post.findAll();
            return users;
        },
    },
    Mutation: {
        createPost: async (_, { content, tags, imgUrl, authorId, comments, likes }, contextValue) => {
            try {
                contextValue.auth()
                const newPost = {
                    content,
                    tags,
                    imgUrl,
                    authorId,
                    comments,
                    likes,
                }
                const res = await Post.createOne(newPost);

                newPost._id = res.insertedId
                return newPost;
            } catch (error) {
                throw new GraphQLError('Error creating post')
            }

        },
    }
}

module.exports = {
    typeDefs,
    resolvers,
};