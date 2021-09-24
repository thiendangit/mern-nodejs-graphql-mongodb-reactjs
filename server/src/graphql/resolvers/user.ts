import {UserContext} from "../../types/userTypes";
import {IUser, User} from "../../models/user";
import 'dotenv/config'
import {Resolvers, User as UserType} from "../generated";
import {UserInputError} from "apollo-server-express";
import {validateLoginInput, validateRegisterInput} from "../../utils/validation";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (res: IUser) => {
  return jwt.sign({
    id: res.id,
    email: res.email,
    username: res.username,
    password: res.password
  }, process.env["SECRET_KEY"], {expiresIn: '48h'})
}

export const userResolvers: Resolvers<UserContext> = {
  Mutation: {
    login: async (_, {loginInput: {username, password}}): Promise<UserType | any> => {
      const {valid, errors} = validateLoginInput({username, password})
      if (!valid) {
        throw new UserInputError('Errors', {errors})
      }
      const user = await User.findOne({username}) as unknown as IUser
      if (!user) {
        errors.general = 'User not found'
        throw new UserInputError('Wrong credentials', {errors})
      }

      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', {errors})
      }
      const token = generateToken(user)
      return {
        ...user._doc,
        id: user._id,
        token
      }
    },
    register: async (_, {
      registerInput: {email, username, password, confirmPassword}
    }): Promise<UserType | any> => {
      // Validate Form
      const {valid, errors} = validateRegisterInput({email, username, password, confirmPassword})
      if (!valid) {
        throw new UserInputError('Errors', {errors})
      }
      // Validate User is existed in DB
      const user = await User.findOne({username})
      if (user) {
        throw new UserInputError('Username is taken', {
          error: {
            username: 'Username is taken'
          }
        })
      }
      password = await bcrypt.hash(password, 12)
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      })

      const res: IUser = await newUser.save()
      const token = generateToken(res)
      return {
        ...res._doc,
        id: res?.id,
        token
      }
    }
  }
};
