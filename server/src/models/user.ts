import {Schema, model, Model, Document} from "mongoose";
import { MongoResult } from "../types/generalTypes";


export interface IUser extends Document, MongoResult {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string,
  password: string,
  createdAt: string,
  token: string
}

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

export const User: Model<IUser> = model('User', userSchema);
