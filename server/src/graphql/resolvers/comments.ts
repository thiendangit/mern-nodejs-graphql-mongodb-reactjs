import {Post as PostType, Resolvers, User} from "../generated";
import {checkAuth} from "../../utils/checkAuth";
import {AuthenticationError, UserInputError} from "apollo-server-express";
import {IPostDocument, Post} from "../../models/post";
import {IUser} from "../../models/user";


export const commentResolvers: Resolvers = {
  Mutation: {
    createComment: async (_, {postId, body}, ctx): Promise<PostType> => {
      const user = await checkAuth(ctx) as User
      if (body.trim() === '') {
        throw new UserInputError('Empty Comment', {
          errors: {
            body: 'Comment body must not empty'
          }
        })
      }
      const post = await Post.findById(postId) as unknown as IPostDocument
      if (post && user.username) {
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString()
        })
        await post.save()
        return post as unknown as PostType
      } else {
        return Promise.reject(new Error('Post not found'))
      }
    },
    deleteComment: async (_, {postId, commentId}, ctx): Promise<PostType> => {
      const user = await checkAuth(ctx) as IUser
      const post = await Post.findById(postId) as unknown as IPostDocument;
      if (post) {
        const commentIndex = post.comments.findIndex((item) => item?.id === commentId)
        if (commentIndex !== -1 && post.comments[commentIndex]?.username === user?.username) {
          post.comments.splice(commentIndex, 1)
          await post.save()
          return post as unknown as PostType
        } else {
          return Promise.reject(new AuthenticationError("Action not allowed."));
        }
      } else {
        return Promise.reject(new Error('Post not found.'))
      }
    }
  }
}
