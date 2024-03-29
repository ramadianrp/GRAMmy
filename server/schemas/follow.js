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
      contextValue.auth();
      const _id = args.id;
      const data = contextValue.auth();
      console.log(_id, "<< data");
      
      const followerId = new ObjectId(String(data.id));
      const followingId = new ObjectId(String(_id));

      const newFollow = {
        followingId,
        followerId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const result = await Follow.insertOne(newFollow);
      newFollow._id = result.insertedId;
      return newFollow;
    }

  },
}


module.exports = {
  typeDefs,
  resolvers,
};