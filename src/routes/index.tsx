import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from '@/layouts/RootLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import PasswordReset from '@/pages/PasswordReset'
import Register from '@/pages/Register'

const router = createBrowserRouter([
  {
    children: [
      { element: <Home />, index: true },
      { element: <Login />, path: 'login' },
      { element: <Register />, path: 'register' },
      { element: <PasswordReset />, path: 'password-reset' },
    ],
    element: <RootLayout />,
    path: '/',
  },
])
export default router
