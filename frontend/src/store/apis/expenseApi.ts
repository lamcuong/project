import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { getCookie } from 'cookies-next'

const expenseApi = createApi({
  reducerPath: 'expenseApi',
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
  tagTypes: ['Expense', 'Account'],
  endpoints: (builder) => {
    return {
      fetchExpense: builder.query({
        providesTags: () => {
          return ['Expense']
        },
        query: (account_id) => {
          return {
            url: `/expense/list/${account_id}`
          }
        },
        transformResponse: (rawResult: { data: { data: Expense[]; paging: Paging } }) => {
          return {
            list: rawResult.data.data,
            paging: rawResult.data.paging
          }
        }
      }),
      fetchOverallList: builder.query({
        query: ({
          account_id = '',
          limit = 10,
          page = 1,
          type = 'month'
        }: {
          account_id: string
          limit?: number | string
          page?: number | string
          type?: string
        }) => {
          return {
            url: `/expense/month-detail/${account_id}?limit=${limit}&page=${page}&type=${type}`
          }
        },
        transformResponse: ({ data }) => {
          return {
            list: data,
            paging: data.paging
          }
        }
      }),
      createExpense: builder.mutation<Expense, ExpenseInput>({
        invalidatesTags: () => {
          return [{ type: 'Expense' }]
        },
        query: (input: ExpenseInput) => {
          return {
            url: '/expense/create',
            method: 'POST',
            body: input
          }
        },
        transformResponse: ({ data }) => {
          return data
        }
      })
    }
  }
})
export const { useFetchExpenseQuery, useCreateExpenseMutation, useFetchOverallListQuery } = expenseApi
export { expenseApi }
