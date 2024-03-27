const { GraphQLError } = require('graphql');
const Follow = require('../model/Follow');
const { ObjectId } = require('mongodb');

const typeDefs = `#graphql
  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }

  type Mutation{
    follow(id: ID): Follow
  }
`;

const resolvers = {
    Mutation: {
        follow: async (_, args, contextValue) => {
            contextValue.auth()
            const user = await contextValue.auth();
            // console.log(user, "<<< user");
            const follow = {
                followingId: new ObjectId(args.id),
                followerId: user.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }; 
            const result = await Follow.insertOne(follow);

            follow._id = result.insertedId

            return follow;
        }
    },
};

module.exports = {
    typeDefs,
    resolvers,
};