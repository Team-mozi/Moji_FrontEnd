import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { type RootState } from '@/store/store'

import { RootLayout } from '@/layouts/RootLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import PasswordReset from '@/pages/PasswordReset'
import Register from '@/pages/Register'

const RequireNoAuth = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth)

  // 로그인 상태면 접근 불가 → 홈으로 이동
  if (isLoggedIn) return <Navigate to='/' replace />

  return <Outlet />
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    path: '/',
    children: [
      { element: <Home />, index: true },

      // 로그인 상태면 접근 불가 라우트
      {
        element: <RequireNoAuth />,
        children: [
          { element: <Login />, path: 'login' },
          { element: <Register />, path: 'register' },
          { element: <PasswordReset />, path: 'password-reset' },
        ],
      },
    ],
  },
])

export default router
