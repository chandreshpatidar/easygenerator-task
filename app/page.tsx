'use client';

import { useAppContext } from '@/lib/store/AppContext';

export default function Home() {
  const { state } = useAppContext();

  return (
    <div className='flex justify-center items-center min-h-screen w-full p-8'>
      <h1 className='text-2xl font-bold text-gray-800'>{`Hi ${state.user?.name}, Welcome to the application.`}</h1>
    </div>
  );
}
