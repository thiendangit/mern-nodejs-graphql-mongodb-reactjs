import {Schema, model, Document} from "mongoose";
import {MongoResult} from "../types/generalTypes";
import {Post as PostType} from "../graphql/generated";

export interface IPostDocument extends Document, MongoResult {
  body: String,
  username: String,
  createdAt: String,
  comments : [
    {
      id?: String,
      body: String,
      username: String,
      createdAt: String
    }
  ],
  likes: [
    {
      id?: String,
      username: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId
  }
}

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments : [
    {
      body: String,
      username: String,
      createdAt: String
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId
  }
});

export const Post = model<PostType>('Post', postSchema);
