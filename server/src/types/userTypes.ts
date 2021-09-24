export interface UserResult {
  id: string,
  email: string,
  token: string,
  username: string,
  createdAt: string
}


export interface UserService {
  register(username: string, password: string, confirmPassword: string): UserResult;
}

export type UserContext = {
  result : UserService
}
