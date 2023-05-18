/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FRHeader, { IRef } from 'components/FRHeader';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import FRContainer from 'components/FRContainer';
import { Toast } from 'services/apis';

const SignIn: React.FC = () => {
  const go = useNavigate();
  const [accountInfo, setAccountInfo] = React.useState({ email: '', password: '' });

  const { onSetOpenPanel, onLogin } = useRecordStore((state) => {
    return {
      onSetOpenPanel: state.onSetOpenPanel,
      onLogin: state.onLogin,
    };
  }, shallow);

  // 更新帳號資訊
  const atChangeInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }, []);

  // 登入按鈕點擊事件
  const atSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const { email, password } = accountInfo;
      onLogin(email, password)
        .then((res) => {
          setAccountInfo({ email: '', password: '' });
          Toast.fire({
            icon: 'success',
            title: '登入成功',
            text: `${res.user?.name} 您好`,
          });
          go('/');
        })
        .catch((err) => {
          setAccountInfo({ email: '', password: '' });
          Toast.fire({
            icon: 'error',
            title: '登入失敗',
            text: err.response.data.message,
          });
        });
    },
    [accountInfo, onLogin, go],
  );

  // popover panel ref
  const panelRef = React.useRef<IRef>(null);

  window.addEventListener('mousedown', (e) => {
    if (
      panelRef.current &&
      !panelRef.current.getDiv().contains(e.target as HTMLElement) &&
      !panelRef.current.getButton().contains(e.target as HTMLElement)
    ) {
      onSetOpenPanel(false);
    }
  });

  return (
    <>
      <FRHeader ref={panelRef} />
      <FRContainer>
        <div className='flex min-h-screen flex-col justify-center overflow-hidden bg-white py-6 dark:bg-black sm:py-12'>
          <div className='mx-auto w-full max-w-md bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10'>
            <div className='w-full'>
              <div className='text-center'>
                <h1 className='text-3xl font-semibold text-gray-900'>登入</h1>
                <p className='mt-2 text-gray-500'>請輸入註冊的Email和密碼</p>
              </div>
              <div className='mt-5'>
                <form onSubmit={atSubmit}>
                  <div className='relative z-10 mt-6'>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      value={accountInfo.email}
                      placeholder='Email Address'
                      className='signin-register-input peer'
                      autoComplete='NA'
                      onChange={(e) => atChangeInput(e)}
                    />
                    <label
                      htmlFor='email'
                      className='pointer-events-none absolute left-0 top-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
                    >
                      帳號
                    </label>
                  </div>
                  <div className='relative z-10 mt-6'>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      value={accountInfo.password}
                      placeholder='Password'
                      className='signin-register-input peer'
                      onChange={(e) => atChangeInput(e)}
                    />
                    <label
                      htmlFor='password'
                      className='pointer-events-none absolute left-0 top-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
                    >
                      密碼
                    </label>
                  </div>
                  <div className='my-6'>
                    <button
                      type='submit'
                      className='w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none'
                    >
                      登入
                    </button>
                  </div>
                  <p className='text-center text-sm text-gray-500'>
                    還沒有帳號？{' '}
                    <span
                      className='cursor-pointer font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none'
                      onClick={() => go('/register')}
                      role='button'
                      tabIndex={-1}
                    >
                      註冊
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </FRContainer>
    </>
  );
};

export default SignIn;
