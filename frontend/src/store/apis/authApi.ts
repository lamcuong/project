import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { getCookie } from 'cookies-next'

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL
  }),
  tagTypes: ['user'],
  endpoints: (builder) => {
    return {
      signUp: builder.mutation({
        query: (body) => {
          return {
            url: '/user/sign-up',
            method: 'POST',
            body
          }
        }
      }),
      signIn: builder.mutation<UserInterface, UserInterface>({
        query: (body) => {
          return {
            url: '/user/sign-in',
            method: 'POST',
            body
          }
        }
      }),
      googleSignIn: builder.mutation<UserInterface, UserInterface>({
        query: (body: UserInterface) => {
          return {
            url: '/user/google-sign-in',
            method: 'POST',
            body
          }
        }
      }),
      me: builder.query<UserInterface, null>({
        // providesTags: (result, error, data) => {
        //   return [{ type: 'user', id: data }];
        // },
        query: () => {
          return {
            url: '/user/me',
            headers: {
              Authorization: getCookie('Authorization')?.toString()
            }
          }
        },
        transformResponse: (response: any) => response.data
      })
    }
  }
})
export const { useSignInMutation, useGoogleSignInMutation, useSignUpMutation, useMeQuery } = authApi

export { authApi }
