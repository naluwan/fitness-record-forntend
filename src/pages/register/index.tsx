/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRegister } from 'services/apis';

const Register: React.FC = () => {
  const go = useNavigate();
  const [registerInfo, setRegisterInfo] = React.useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
    avatar: '',
  });

  // 更新註冊資訊
  const atChangeInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }, []);

  // 註冊事件
  const atSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log('register ==> ', registerInfo);
      fetchRegister(registerInfo);
    },
    [registerInfo],
  );
  return (
    <div className='relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12'>
      <div className='relative mx-auto w-full max-w-md bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10'>
        <div className='w-full'>
          <div className='text-center'>
            <h1 className='text-3xl font-semibold text-gray-900'>註冊</h1>
          </div>
          <div className='mt-5'>
            <form onSubmit={atSubmit} encType='multipart/form-data'>
              {/* 使用者名稱 */}
              <div className='relative mt-6'>
                <input
                  type='text'
                  name='name'
                  id={registerInfo.name}
                  placeholder='使用者名稱'
                  className='peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none'
                  autoComplete='NA'
                  onChange={(e) => atChangeInput(e)}
                />
                <label
                  htmlFor={registerInfo.name}
                  className='pointer-events-none absolute left-0 top-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
                >
                  使用者名稱
                </label>
              </div>

              {/* email */}
              <div className='relative mt-6'>
                <input
                  type='email'
                  name='email'
                  id={registerInfo.email}
                  placeholder='Email Address'
                  className='peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none'
                  autoComplete='NA'
                  onChange={(e) => atChangeInput(e)}
                />
                <label
                  htmlFor={registerInfo.email}
                  className='pointer-events-none absolute left-0 top-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
                >
                  Email
                </label>
              </div>

              {/* password */}
              <div className='relative mt-6'>
                <input
                  type='password'
                  name='password'
                  id={registerInfo.password}
                  placeholder='password'
                  className='peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none'
                  autoComplete='NA'
                  onChange={(e) => atChangeInput(e)}
                />
                <label
                  htmlFor={registerInfo.password}
                  className='pointer-events-none absolute left-0 top-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
                >
                  密碼
                </label>
              </div>

              {/* password check */}
              <div className='relative mt-6'>
                <input
                  type='password'
                  name='passwordCheck'
                  id={registerInfo.passwordCheck}
                  placeholder='passwordCheck'
                  className='peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none'
                  autoComplete='NA'
                  onChange={(e) => atChangeInput(e)}
                />
                <label
                  htmlFor={registerInfo.passwordCheck}
                  className='pointer-events-none absolute left-0 top-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
                >
                  確認密碼
                </label>
              </div>

              {/* avatar */}
              <div className='relative mt-6'>
                <input
                  type='file'
                  name='avatar'
                  id={registerInfo.avatar}
                  placeholder='使用者頭像'
                  className='peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none'
                  autoComplete='NA'
                  onChange={(e) => atChangeInput(e)}
                />
                <label
                  htmlFor={registerInfo.avatar}
                  className='pointer-events-none absolute left-0 top-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
                >
                  使用者頭像
                </label>
              </div>

              {/* 註冊按鈕 */}
              <div className='my-6'>
                <button
                  type='submit'
                  className='w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none'
                >
                  註冊
                </button>
              </div>

              {/* 登入頁按鈕 */}
              <p className='text-center text-sm text-gray-500'>
                已經有帳號？{' '}
                <span
                  className='cursor-pointer font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none'
                  onClick={() => go('/signin')}
                  role='button'
                  tabIndex={-1}
                >
                  登入
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
