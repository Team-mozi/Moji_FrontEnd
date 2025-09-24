import RegisterForm from '@/features/auth/RegisterForm'

const Register = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white'>
      <div className='w-full max-w-xl p-8 sm:p-10 space-y-6'>
        <div className='flex flex-row items-center space-x-2'>
          <h2 className='text-2xl font-bold text-black'>회원가입</h2>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
export default Register
