import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['Example'],
  endpoints: (builder) => ({
    user: builder.query<{ status: string }, void>({
      query: () => 'user',
    }),
  }),
})

export const { useUserQuery } = api
