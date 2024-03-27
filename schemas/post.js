const { GraphQLError } = require('graphql');
const Post = require('../model/Post');
const { ObjectId } = require('mongodb');
const { redis } = require('../config/redis');
const { database } = require('../config/mongo');

const typeDefs = `#graphql
    scalar Date

  type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID 
    comments: [Comments]
    likes: [Likes]
    createdAt: Date
    updatedAt: Date
  }

  type Likes{
    username: String!
    createdAt: String
    updatedAt: String
  }

  type Comments{
    content: String!
    username: String!
    createdAt: String
    updatedAt: String
  }  

  type Query {
    posts: [Post]
    postById(_id: ID): Post
    postsNewer: [Post]
  }

  type Mutation{
    createPost(content: String!, tags: [String], imgUrl: String): Post
    addComment(postId: ID!, content: String!): Comments
    addLike(postId: ID!): Likes
  }
`;

const resolvers = {
    Query: {
        posts: async () => {
            const posts = await Post.findAll();
            return posts;
        },
        postById: async (_, args, contextValue) => {
            try {
                contextValue.auth();
                if (!args._id) throw new Error("Id is required");
        
                const post = await Post.findById(args._id);
        
                return post[0];
              } catch (error) {
                throw error;
              }
        
        },
        postsNewer: async (_, __, contextValue) => {
            try {
              contextValue.auth();
      
              const redisPost = await redis.get("Post");
              if(redisPost) {
                return JSON.parse(redisPost)
              } else {
                const posts = await Post.findAll();
                await redis.set("Post", JSON.stringify(posts));
                
                return posts;
              }
            } catch (error) {
              throw error;
            }
          }
    },
    Mutation: {
        createPost: async (_, { content, tags, imgUrl }, contextValue) => {
            try {
                const currentUser = contextValue.auth();
                const authorId = new ObjectId(currentUser.id);

                if (!content) throw new Error("Content is required");
                if (!authorId) throw new Error("Author ID is required");

                const newPost = {
                    content,
                    tags,
                    imgUrl,
                    authorId,
                    comments: [],
                    likes: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                const result = await Post.createOne(newPost);
                newPost._id = result.insertedId;

                await redis.del("Post");

                return newPost;
            } catch (error) {
                throw error;
            }
        },
        addComment: async (_, args, contextValue) => {
            contextValue.auth()
            const user = await contextValue.auth()
            // console.log(user, "<< user");
            const { content, postId } = args
            const comment = await database.collection('Post').updateOne({ _id: new ObjectId(postId) }, {
                $push: {
                    comments: {
                        content,
                        username: user.username,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }
                }
            })

            return {
                content,
                username: user.username,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        },
        addLike: async (_, args, contextValue) => {
            contextValue.auth()
            const user = await contextValue.auth()
            const { postId } = args
            const post = await database.collection('Post').findOne(
                { _id: new ObjectId(postId), 'likes.username': user.username }
            )
            if (!post) {
                const Like = await database.collection('Post').updateOne({ _id: new ObjectId(postId) }, {
                    $push: {
                        likes: {
                            username: user.username,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        }
                    }
                })
                return {
                    username: user.username,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            } else {
                console.log('already exist');
            }
        }
    }
}

module.exports = {
    typeDefs,
    resolvers,
};