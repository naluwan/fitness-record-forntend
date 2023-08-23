/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FRHeader, { IRef } from 'components/FRHeader';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import FRContainer from 'components/FRContainer';
import { Toast } from 'utils/swal';

const SignIn: React.FC = () => {
  const go = useNavigate();
  const [accountInfo, setAccountInfo] = React.useState({ email: '', password: '' });

  const { onSetOpenPanel, onLogin, onSetLoginByLine, onSetIsNewUser } = useRecordStore((state) => {
    return {
      onSetOpenPanel: state.onSetOpenPanel,
      onLogin: state.onLogin,
      onSetLoginByLine: state.onSetLoginByLine,
      onSetIsNewUser: state.onSetIsNewUser,
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

  // line登入按鈕點擊事件，點擊後開啟
  const lineLoginClick = React.useCallback(() => {
    onSetLoginByLine(true);
    let URL = 'https://access.line.me/oauth2/v2.1/authorize?';
    // 必填
    URL += 'response_type=code';
    URL += `&client_id=${process.env.REACT_APP_LINE_LOGIN_CHANNEL_ID}`;
    URL += `&redirect_uri=${process.env.REACT_APP_LINE_LOGIN_REDIRECT_URL}`;
    URL += '&state=PPcWFJFWTCsZpU0JCVgnqi3C';
    URL += '&scope=email%20profile%20openid';
    // 選填
    URL += '&ui_locales=zh-TW';
    // 轉跳到該網址
    window.open(URL, '_self');
  }, [onSetLoginByLine]);

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
        <div className='flex h-full w-full flex-col justify-center overflow-hidden bg-white py-6 dark:bg-black sm:py-20'>
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
                  <div className='my-6 flex flex-col items-center'>
                    <button
                      type='submit'
                      className='mb-3 w-full rounded-xl bg-black px-3 py-4 font-medium text-white focus:bg-gray-600 focus:outline-none disabled:opacity-25'
                      disabled={accountInfo.email === '' || accountInfo.password === ''}
                    >
                      登入
                    </button>
                    <div className='mb-3 w-full text-center text-black'>
                      <p className='font-normal'>or</p>
                    </div>
                    <button
                      onClick={lineLoginClick}
                      className='flex w-full items-center rounded-xl bg-[#06c755] py-1'
                      type='button'
                    >
                      <div
                        className='mx-2 h-12 w-12'
                        style={{
                          backgroundImage: 'url(images/btn_base.png)',
                          backgroundPosition: 'center',
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                      <div className='h-12 border-l-[1.5px] border-[#E5E5E5] opacity-60' />
                      <p className='mr-14 w-full flex-1 font-medium'>Login In</p>
                    </button>
                  </div>
                  <p className='text-center text-sm text-gray-500'>
                    還沒有帳號？{' '}
                    <span
                      className='cursor-pointer font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none'
                      onClick={() => {
                        onSetIsNewUser(true);
                        go('/register');
                      }}
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
