import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'

const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders(headers) {
      headers.set(
        'Authorization',
        `Bearer ${getCookie('Authorization')}
        `
      )
      return headers
    }
  }),
  tagTypes: ['Account', 'Expense'],
  endpoints: (builder) => {
    return {
      addAccount: builder.mutation({
        invalidatesTags: () => {
          return [{ type: 'Account' }]
        },
        query: (account) => {
          return {
            url: '/account/create',
            method: 'POST',
            body: account
          }
        }
      }),
      deleteAccount: builder.mutation({
        invalidatesTags: () => {
          return [{ type: 'Account' }]
        },
        query: (id) => {
          return {
            url: `/account/delete/${id}`,
            method: 'DELETE',
            body: id
          }
        }
      }),
      fetchAccount: builder.query({
        providesTags: () => {
          return ['Account', 'Expense']
        },
        query: ({ limit = 1, page = 1, search = '' }) => {
          return {
            url: `/account/list?limit=${limit}&page=${page}&search=${search}`,
            method: 'GET'
          }
        },
        transformResponse: (rawResult: { data: { list: AccountInterface[]; paging: any } }) => {
          return {
            list: rawResult.data.list,
            paging: rawResult.data.paging
          }
        }
      }),
      getDetail: builder.query({
        providesTags: (_, _1, user_id) => {
          return [{ type: 'Account', id: user_id }]
        },
        query: (account_id) => {
          return {
            url: `/account/detail/${account_id}`,
            method: 'GET'
          }
        }
      })
    }
  }
})
export const { useFetchAccountQuery, useAddAccountMutation, useDeleteAccountMutation, useGetDetailQuery } = accountApi

export { accountApi }
