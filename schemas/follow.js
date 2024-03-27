const { GraphQLError } = require('graphql');
const Follow = require('../model/Follow');

const typeDefs = `#graphql
  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    follow: [Follow]
  }

  type Mutation{
  
  }
`;

const resolvers = {
    Query: {
        follow: async () => {
            const users = await Follow.findAll();
            return users;
        },
    },
    Mutation: {
        
    },
};

module.exports = {
    typeDefs,
    resolvers,
};