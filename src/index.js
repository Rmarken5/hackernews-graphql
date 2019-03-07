const {
    GraphQLServer
} = require('graphql-yoga')


let links = [{
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
        link: (parent, args) => {
            console.log(args.id);
            let filtered;
            links.forEach((link) => {
                console.log(`Link ${link}: ${link.id}`);
                if (link.id == args.id) {
                    filtered = link;
                }
            })
            console.log(`Filtered ${filtered}`)
            return filtered;
        },
        /*  feed: () => {
             return links;
         }, */
    },
    Mutation: {
        deleteLink: (parent, args) => {
            console.log(args);
            let result;
           links.forEach((link,index) => {
                if(link.id == args.id){
                    result = link;
                }
            })
            return result;
        },
        updateLink: (parent, args) => {

        },
    },
}


const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
})

server.start(() => {
    console.log(`Server is running on http://localhost:4000`);
});