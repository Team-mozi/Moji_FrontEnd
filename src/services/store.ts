import { configureStore } from '@reduxjs/toolkit'

import { api } from './api'

export const store = configureStore({
  devTools: import.meta.env.MODE !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  reducer: {
    [api.reducerPath]: api.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
