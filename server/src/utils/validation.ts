import {RegisterInput} from "../graphql/generated";
import validator from "validator";
import isEmail = validator.isEmail;

type ValidationResponse<T = RegisterInput> = {
  errors: Partial<T & {general : string}>,
  valid: boolean
}

const validateRegisterInput = (
  {
    username,
    email,
    password,
    confirmPassword
  }: RegisterInput
): ValidationResponse => {
  const errors: Partial<RegisterInput> = {}
  if (username.trim() === '') {
    errors.username = 'Username cannot empty !'
  }
  if (email.trim() === '') {
    errors.email = 'Email cannot empty !'
  } else {
    if (!isEmail(email)) {
      errors.email = 'Email must be a valid email !'
    }
  }
  if (password.trim() === '') {
    errors.password = 'Password cannot empty !'
  } else {
    if (password.trim() !== confirmPassword.trim()) {
      errors.confirmPassword = 'ConfirmPassword must be equal with password!'
    }
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

const validateLoginInput = ({username, password} : Partial<RegisterInput>) : ValidationResponse => {
  const errors: Partial<RegisterInput & {general : string}> = {}
  if (username.trim() === '') {
    errors.username = 'Username cannot empty !'
  }
  if (password.trim() === '') {
    errors.password = 'Password cannot empty !'
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}


export {
  validateRegisterInput,
  validateLoginInput
}
