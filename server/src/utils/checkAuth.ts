import {AuthenticationError} from "apollo-server-express";
import 'dotenv/config'

const jwt = require('jsonwebtoken');

const checkAuth = async (context: any) => {
  const authHeader = context?.res?.req?.headers.authorization;
  if (authHeader) {
    const token: string = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        return await jwt.verify(token, process.env["SECRET_KEY"])
      } catch (e) {
        throw new AuthenticationError('Invalid/Expired token')
      }
    }
    throw new Error('Authentication token must be \'Bearer [token]')
  }
  throw new Error('Authentication headers must be provided')
}

export {
  checkAuth
}
