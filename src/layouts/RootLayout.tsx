import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <div>
      {/* <nav style={{ display: 'flex', gap: 12 }}>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        <Link to='/password-reset'>Password Reset</Link>
      </nav> */}

      <main>
        <Outlet />
      </main>
    </div>
  )
}
