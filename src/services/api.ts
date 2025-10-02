import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.accessToken
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
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
