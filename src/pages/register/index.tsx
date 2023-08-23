/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import Loading from 'components/Loading';
import FRHeader, { IRef } from 'components/FRHeader';
import FRContainer from 'components/FRContainer';
import { RegisterInfoType } from 'services/apis';
import { Toast } from 'utils/swal';

const Register: React.FC = () => {
  const go = useNavigate();

  const { isFetching, onSetOpenPanel, onRegister, onSetIsNewUser } = useRecordStore((state) => {
    return {
      isFetching: state.isFetching,
      onSetOpenPanel: state.onSetOpenPanel,
      onRegister: state.onRegister,
      onSetIsNewUser: state.onSetIsNewUser,
    };
  }, shallow);

  const [registerInfo, setRegisterInfo] = React.useState<RegisterInfoType>({
    name: '',
    email: '',
    weight: null,
    waistline: null,
    password: '',
    passwordCheck: '',
    avatar: null,
  });

  const [selectedFiles, setSelectedFiles] = React.useState<
    { preview: string; name: string }[] | null
  >(null);

  // 拖拉檔案區域設定
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: { 'image/*': [] },
    multiple: false,
    // 當圖片被選取或拖拉進區塊的時候執行
    onDrop: (acceptedFile) => {
      // 設定預覽圖片檔案
      setSelectedFiles(
        acceptedFile.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );

      // 設定註冊頭像檔案
      setRegisterInfo((prev) => {
        return {
          ...prev,
          avatar: acceptedFile as unknown as FileList,
        };
      });
    },
  });

  // 使用者頭像預覽
  const AvatarPreview = selectedFiles?.map((file) => {
    return (
      <div className='box-border h-[150px] w-[150px] overflow-hidden rounded-full' key={file.name}>
        <img
          className='h-[150px] w-[150px] rounded-full object-cover'
          src={file.preview}
          onLoad={() => URL.revokeObjectURL(file.preview)}
          alt='avatar'
        />
      </div>
    );
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
      onRegister(registerInfo)
        .then((res) => {
          setRegisterInfo({
            name: '',
            email: '',
            weight: null,
            waistline: null,
            password: '',
            passwordCheck: '',
            avatar: null,
          });
          Toast.fire({
            icon: 'success',
            title: '註冊成功',
          });
          onSetIsNewUser(false);
          go('/signin');
        })
        .catch((err) => {
          const { message } = err.response.data;
          Toast.fire({
            icon: 'error',
            title: '註冊失敗',
            text: message,
          });
          if (message === '此帳號已註冊過') {
            setRegisterInfo((prev) => {
              return {
                ...prev,
                email: '',
              };
            });
          } else if (message === '密碼與確認密碼不相符') {
            setRegisterInfo((prev) => {
              return {
                ...prev,
                password: '',
                passwordCheck: '',
              };
            });
          }
        });
    },
    [registerInfo, go, onRegister, onSetIsNewUser],
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
                <h1 className='text-3xl font-semibold text-gray-900'>註冊</h1>
                <p className='mb-2 text-left text-sm text-gray-500'>
                  <span className='text-sm text-red-500'>*</span>
                  為必填欄位
                </p>
                <p className='mb-2 text-left text-sm text-gray-500'>
                  體重和腰圍非必填，但要發文則必須填寫(
                  <span className='text-sm text-red-500'>
                    如果連自己都欺騙，那你的人生還指望能活成什麼樣？
                  </span>
                  )
                </p>
                <p className='text-left text-sm text-gray-500'>
                  沒有上傳使用者頭像，將會使用預設頭像
                </p>
              </div>
              <div className='mt-5'>
                <form onSubmit={(e) => atSubmit(e)} encType='multipart/form-data'>
                  {/* 使用者名稱 */}
                  <div className='relative z-10 mt-6'>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      value={registerInfo.name}
                      placeholder='使用者名稱'
                      className='signin-register-input peer'
                      autoComplete='NA'
                      onChange={(e) => atChangeInput(e)}
                    />
                    <label
                      htmlFor={registerInfo.name}
                      className='pointer-events-none absolute left-0 top-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
                    >
                      <span
                        className={`${registerInfo.name !== '' && 'hidden'} text-sm text-red-500`}
                      >
                        *
                      </span>
                      使用者名稱
                    </label>
                  </div>

                  {/* email */}
                  <div className='relative z-10 mt-6'>
                    <input
                      type='email'
                      name='email'
                      value={registerInfo.email}
                      placeholder='Email Address'
                      className='signin-register-input peer'
                      autoComplete='NA'
                      onChange={(e) => atChangeInput(e)}
                    />
                    <label
                      htmlFor={registerInfo.email}
                      className='pointer-events-none absolute left-0 top-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
                    >
                      <span
                        className={`${registerInfo.email !== '' && 'hidden'} text-sm text-red-500`}
                      >
                        *
                      </span>
                      Email
                    </label>
                  </div>

                  {/* password */}
                  <div className='relative z-10 mt-6'>
                    <input
                      type='password'
                      name='password'
                      value={registerInfo.password}
                      placeholder='password'
                      className='signin-register-input peer'
                      autoComplete='NA'
                      onChange={(e) => atChangeInput(e)}
                    />
                    <label
                      htmlFor={registerInfo.password}
                      className='pointer-events-none absolute left-0 top-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
                    >
                      <span
                        className={`${
                          registerInfo.password !== '' && 'hidden'
                        } text-sm text-red-500`}
                      >
                        *
                      </span>
                      密碼
                    </label>
                  </div>

                  {/* password check */}
                  <div className='relative z-10 mt-6'>
                    <input
                      type='password'
                      name='passwordCheck'
                      value={registerInfo.passwordCheck}
                      placeholder='passwordCheck'
                      className='signin-register-input peer'
                      autoComplete='NA'
                      onChange={(e) => atChangeInput(e)}
                    />
                    <label
                      htmlFor={registerInfo.passwordCheck}
                      className='pointer-events-none absolute left-0 top-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
                    >
                      <span
                        className={`${
                          registerInfo.passwordCheck !== '' && 'hidden'
                        } text-sm text-red-500`}
                      >
                        *
                      </span>
                      確認密碼
                    </label>
                    <p
                      className={`absolute top-10 text-sm text-red-500 ${
                        registerInfo.password !== registerInfo.passwordCheck ? 'block' : 'hidden'
                      }`}
                    >
                      密碼和確認密碼不相同
                    </p>
                  </div>

                  {/* weight */}
                  <div className='relative z-10 mt-6'>
                    <input
                      type='number'
                      name='weight'
                      id='weight'
                      value={registerInfo.weight ? registerInfo.weight : ''}
                      placeholder='weight'
                      className='signin-register-input peer'
                      autoComplete='NA'
                      onChange={(e) => atChangeInput(e)}
                    />
                    <label
                      htmlFor='weight'
                      className='pointer-events-none absolute left-0 top-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
                    >
                      體重
                    </label>
                  </div>

                  {/* waistline */}
                  <div className='relative z-10 mt-6'>
                    <input
                      type='number'
                      name='waistline'
                      id='waistline'
                      value={registerInfo.waistline ? registerInfo.waistline : ''}
                      placeholder='waistline'
                      className='signin-register-input peer'
                      autoComplete='NA'
                      onChange={(e) => atChangeInput(e)}
                    />
                    <label
                      htmlFor='waistline'
                      className='pointer-events-none absolute left-0 top-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
                    >
                      腰圍
                    </label>
                  </div>

                  {/* avatar */}
                  <div className='relative z-10 mt-6'>
                    <div className='flex w-full items-center justify-center'>
                      <div
                        className='dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                        {...getRootProps()}
                      >
                        {selectedFiles && selectedFiles.length > 0 ? (
                          AvatarPreview
                        ) : (
                          <div className='flex flex-col items-center justify-center pb-6 pt-5'>
                            <svg
                              aria-hidden='true'
                              className='mb-3 h-10 w-10 text-gray-400'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                              />
                            </svg>
                            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                              <span className='font-semibold'>點擊上傳頭像圖片</span>{' '}
                              或將圖片拖拉至此
                            </p>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>
                              使用者頭像 (如沒有上傳，將使用預設頭像)
                            </p>
                          </div>
                        )}

                        <input
                          id='dropzone-file'
                          type='file'
                          className='hidden'
                          {...getInputProps()}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 註冊按鈕 */}
                  <div className='my-6'>
                    <button
                      type='submit'
                      className='flex w-full justify-center rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none disabled:bg-gray-600'
                      disabled={isFetching || registerInfo.password !== registerInfo.passwordCheck}
                    >
                      {isFetching ? <Loading /> : '註冊'}
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
      </FRContainer>
    </>
  );
};

export default Register;
