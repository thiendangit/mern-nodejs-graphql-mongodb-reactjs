import {Post as PostType, Resolvers} from "../generated";
import {checkAuth} from "../../utils/checkAuth";
import {IPostDocument, Post} from "../../models/post";
import {IUser} from "../../models/user";


export const likesResolvers: Resolvers = {
  Mutation: {
    likePost: async (_, {postId}, ctx): Promise<PostType> => {
      const user = await checkAuth(ctx) as IUser
      const post = await Post.findById(postId) as unknown as IPostDocument;
      const isExisted = post?.likes?.findIndex((item) => item?.username === user.username) !== -1
      if (post && user?.username && !isExisted) {
        post.likes.unshift({
          username: user.username,
          createdAt: new Date().toISOString()
        })
        await post.save()
        return post as unknown as PostType
      } else {
        if (post) {
          return Promise.reject(new Error('You are liked this post.'))
        }
        return Promise.reject(new Error('Post not found.'))
      }
    },
    unLikePost: async (_, {postId}, ctx) => {
      const user = await checkAuth(ctx) as IUser
      const post = await Post.findById(postId) as unknown as IPostDocument;
      const likesIndex = post?.likes?.findIndex((item) => item?.username === user.username)
      if (post && user?.username && likesIndex !== -1) {
        post.likes.splice(likesIndex, 1)
        await post.save()
        return post as unknown as PostType
      } else {
        if (post) {
          return Promise.reject(new Error('You are unLiked this post.'))
        }
        return Promise.reject(new Error('Post not found.'))
      }
    }
  }
}
