const { ApolloServer } = require ('@apollo/server');
const { startStandaloneServer } = require ('@apollo/server/standalone');
const { 
    typeDefs: typeDefsBook, 
    resolvers: resolversBook 
} = require('./schemas/user');

const server = new ApolloServer({
    typeDefs: [typeDefsBook],
    resolvers: [resolversBook],
    introspection: true
});

(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 3000 },
        context: () => {
            return {
                id: "1"
            }
        }
    });
    console.log(`🚀 Server ready at ${url}`);
})();