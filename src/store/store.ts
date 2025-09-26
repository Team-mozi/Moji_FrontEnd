import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import { UserApi } from '@/services/endpoints/user'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [UserApi.reducerPath]: UserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserApi.middleware),
  devTools: import.meta.env.MODE !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
