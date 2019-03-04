const {
    GraphQLServer
} = require('graphql-yoga')


const links = [{
    id: 1,
    description: `It's google`,
    url: `www.google.com`
}, {
    id: 2,
    description: `It's Yahoo`,
    url: `www.yahoo.com`
}, {
    id: 3,
    description: `GraphQL is AWESOME`,
    url: `www.graphqlisawesome.com`
}];
let idCount = links.length;
const resolvers = {
    Query: {
        info: () => {
            return `This is the API of Hackernews Clone.`
        },
        feed: () => {
            return links;
        },
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: idCount++,
                description: args.description,
                url: args.url,
            }
            links.push(link);
            return link;
        }
    },
}


const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
})

server.start(() => {
    console.log(`Server is running on http://localhost:4000`);
});