const { ApolloServer } = require ('@apollo/server');
const { startStandaloneServer } = require ('@apollo/server/standalone');
const { 
    typeDefs: typeDefsUser, 
    resolvers: resolversUser
} = require('./schemas/user');
const {
    typeDefs: typeDefsPost,
    resolvers: resolversPost
} = require('./schemas/post');
const { verifyToken } = require('./helpers/jwt');

const server = new ApolloServer({
    typeDefs: [typeDefsUser, typeDefsPost],
    resolvers: [resolversUser, resolversPost],
    introspection: true
});

(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 3000 },
        context: () => {
            return {
                id: "123",
                auth: () => {
                    const auth = req.headers.authorization;
                    if (!auth){
                        throw new Error('Invalid Token');
                    }
                    const token = auth.split(' ')[1];
                    const decoded = verifyToken(token);
                    return decoded;
                }
            }
        }
    });
    console.log(`🚀 Server ready at ${url}`);
})();