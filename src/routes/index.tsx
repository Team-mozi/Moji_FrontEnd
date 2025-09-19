import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from '@/layouts/RootLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import PasswordReset from '@/pages/PasswordReset'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    path: '/',
    children: [
      { element: <Home />, index: true },
      { element: <Login />, path: 'login' },
      { element: <Register />, path: 'register' },
      { element: <PasswordReset />, path: 'password-reset' },
    ],
  },
])
export default router
