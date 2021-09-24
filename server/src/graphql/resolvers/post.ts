import {IPostDocument, Post} from "../../models/post";
import {Post as IPost, Resolvers, User} from "../generated";
import {checkAuth} from "../../utils/checkAuth";
import {AuthenticationError} from "apollo-server-express";
import {pubsub} from "../../main";

export const postResolvers: Resolvers = {
  Query: {
    getPosts: async (): Promise<IPost[]> => {
      {
        try {
          return await Post.find().sort({createdAt: -1}) as any[];
        } catch (err) {
          throw new Error(err);
        }
      }
    },
    getPost: async (_, {postId}): Promise<IPost> => {
      try {
        const post = await Post.findById(postId) as any;
        if (post) {
          return post;
        } else {
          return Promise.reject(new Error("Post not found."));
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    createPost: async (_, {body}, ctx): Promise<IPost> => {
      const user = await checkAuth(ctx) as User
      const newPost = new Post({
        user: user.id,
        body: body,
        createdAt: new Date().toISOString(),
        username: user.username
      })
      pubsub.publish('NEW_POST', {
        newPost: newPost
      })
      return await newPost.save() as unknown as IPost
    },
    deletePost: async (_, {postId}, ctx): Promise<string> => {
      const user = await checkAuth(ctx) as User
      try {
        const post = await Post.findById(postId) as unknown as IPostDocument;
        if (user?.username === post?.username) {
          await post.delete()
          return 'Delete post successfully !'
        } else {
          if (!post) {
            return Promise.reject(new Error("Post not found."));
          } else {
            return Promise.reject(new AuthenticationError("Action not allowed."));
          }
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: () => pubsub.asyncIterator(['NEW_POST'])
    }
  }
}
