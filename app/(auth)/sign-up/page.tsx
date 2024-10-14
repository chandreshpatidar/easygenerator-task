import Signup from '@/modules/sign-up/components';

export default function SignupPage() {
  return (
    <div className='flex justify-center items-center min-h-screen w-full p-8'>
      <div className='w-full max-w-[500px] bg-white rounded-2xl border border-gray-200 p-8'>
        <h1 className='text-2xl font-bold text-gray-800 text-center mb-2'>Sign Up to Easygenerator</h1>
        <p className='text-gray-400 text-center mb-8'>Welcome! Please sign up to continue</p>
        <Signup />
      </div>
    </div>
  );
}
