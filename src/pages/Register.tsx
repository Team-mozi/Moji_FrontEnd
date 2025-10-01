import RegisterForm from '@/features/auth/RegisterForm'
import BackSheet from '@/components/BackSheet'

const Register = () => {
  return (
    <BackSheet showHeader={true} title='회원가입'>
      <div className='flex flex-col items-center justify-center w-full'>
        <div className='w-full max-w-[448px]'>
          <RegisterForm />
        </div>
      </div>
    </BackSheet>
  )
}

export default Register
