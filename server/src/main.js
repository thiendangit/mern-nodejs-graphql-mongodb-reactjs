"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_server_1 = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv/config");
const resolvers_1 = require("./graphql/resolvers");
const load_1 = require("@graphql-tools/load");
const graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
const schema_1 = require("@graphql-tools/schema");
const schema = (0, load_1.loadSchemaSync)("src/**/*.graphql", {
    loaders: [new graphql_file_loader_1.GraphQLFileLoader()],
});
const schemaWithResolvers = (0, schema_1.addResolversToSchema)({
    schema,
    resolvers: resolvers_1.resolvers,
});
const server = new apollo_server_1.ApolloServer({ schema: schemaWithResolvers });
mongoose.connect(process.env.MONGODB_URL, (err) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    if (err)
        throw err;
    console.log("connected to db successfully!");
    server.listen({ port: 3000 })
        .then((res) => {
        console.log(`Server running on ${res.url}`);
    });
}));
//# sourceMappingURL=main.js.map