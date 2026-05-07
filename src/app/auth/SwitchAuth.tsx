import type { Dispatch, SetStateAction } from 'react';

interface Props {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

export function SwitchAuth({ isLogin, setIsLogin }: Props) {
  return (
    <div className='mb-6 flex justify-center'>
      <button
        type='button'
        className={`cursor-pointer px-4 py-2 font-semibold
          ${isLogin ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        onClick={() => setIsLogin(true)}
      >
        Login
      </button>
      <button
        type='button'
        className={`cursor-pointer px-4 py-2 font-semibold
          ${!isLogin ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        onClick={() => setIsLogin(false)}
      >
        Registration
      </button>
    </div>
  );
}
