import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    user: builder.query<{ status: string }, void>({
      query: () => 'user',
    }),
  }),
  reducerPath: 'api',
  tagTypes: ['Example'],
})

export const { useUserQuery } = api
