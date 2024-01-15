import { apiUser } from '../config'
import { handleRequest } from '../handle'
import { LoginResponse, UserInterface, UserResponse } from '@/types/user'

const signIn = (input: UserInterface) => {
  return handleRequest<LoginResponse>(`${apiUser}/sign-in`, {
    method: 'post',
    data: input
  })
}
const signUp = (input: UserInterface) => {
  return handleRequest<UserResponse>(`${apiUser}/sign-up`, {
    method: 'post',
    data: input
  })
}
const me = async () => {
  return handleRequest<UserResponse>(`${apiUser}/me`, {
    method: 'get'
  })
}

export const userApi = {
  signIn,
  signUp,
  me
}
