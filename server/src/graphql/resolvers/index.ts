// import {postResolvers} from "./post";
import { commentResolvers } from "./comments";
import { postResolvers } from "./post";
import {userResolvers} from "./user";
import {likesResolvers} from "./likes";

export const resolvers = {
  Query: {
    ...postResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...likesResolvers.Mutation,
  },
  Subscription: {
    ...postResolvers.Subscription
  }
}
