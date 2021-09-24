"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const post_1 = require("./post");
const user_1 = require("./user");
exports.resolvers = {
    Query: Object.assign({}, post_1.postResolvers.Query),
    Mutation: Object.assign({}, user_1.userResolvers.Mutation)
};
//# sourceMappingURL=index.js.map