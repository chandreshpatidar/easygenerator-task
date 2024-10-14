import Signin from '@/modules/sign-in/components';

export default function SigninPage() {
  return (
    <div className='flex justify-center items-center min-h-screen w-full p-8'>
      <div className='w-full max-w-[500px] bg-white rounded-2xl border border-gray-200 p-8'>
        <h1 className='text-2xl font-bold text-gray-800 text-center mb-2'>Sign In to Easygenerator</h1>
        <p className='text-gray-400 text-center mb-8'>Welcome back! Please sign in to continue</p>
        <Signin />
      </div>
    </div>
  );
}
