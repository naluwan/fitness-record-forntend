import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import type { Record, SportCategory } from 'types';
import { Confirm, Toast } from 'utils/swal';
import FRHamburgerAnimated from './FRHamburgerAnimated';
import FRPopoverPanel from './FRPopoverPanel';
import ToggleSwitch from './ToggleSwitch';
import FRModal from './FRModal';
import FRPostFrom from './FRPostFrom';
import { fetchPostRecord } from '../services/apis';
import Loading from './Loading';

// 設定多個ref的type
export interface IRef {
  getDiv: () => HTMLDivElement;
  getButton: () => HTMLButtonElement;
}

type FRHeaderProps = {
  allSportCategories?: SportCategory[];
  refreshAllRecord?: () => void;
  refreshWeightRank?: () => void;
  refreshWaistlineRank?: () => void;
};

const FRHeader = React.forwardRef<IRef, FRHeaderProps>((props, ref) => {
  const go = useNavigate();
  const { allSportCategories, refreshAllRecord, refreshWeightRank, refreshWaistlineRank } = props;

  const [openModal, setOpenModal] = React.useState(false);

  const { user, isDark, isFetching, onSetIsDark, onSetOpenPanel, onLogout, onSetIsFetching } =
    useRecordStore((state) => {
      return {
        user: state.user,
        isDark: state.isDark,
        isFetching: state.isFetching,
        onSetIsDark: state.onSetIsDark,
        onSetOpenPanel: state.onSetOpenPanel,
        onLogout: state.onLogout,
        onSetIsFetching: state.onSetIsFetching,
      };
    }, shallow);

  // 分別設定div和button的ref
  const divRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // 使用useImperativeHandle來回傳各個ref
  React.useImperativeHandle(ref, () => ({
    getDiv() {
      return divRef.current as HTMLDivElement;
    },
    getButton() {
      return buttonRef.current as HTMLButtonElement;
    },
  }));

  // new record
  const [newRecord, setNewRecord] = React.useState<Record>({
    date: new Date().toDateString(),
    weight: 0,
    waistline: 0,
    description: '',
    sportCategoryId: 0,
    Images: null,
  });

  // submit new record event
  const atSubmitNewRecord = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSetIsFetching(true);
      fetchPostRecord(newRecord)
        .then((res) => {
          setNewRecord({
            date: new Date().toDateString(),
            weight: 0,
            waistline: 0,
            description: '',
            sportCategoryId: 0,
            Images: null,
          });
          Toast.fire({
            icon: 'success',
            title: '新增記錄成功',
          });
          setOpenModal(false);
          if (
            typeof refreshAllRecord === 'function' &&
            typeof refreshWeightRank === 'function' &&
            typeof refreshWaistlineRank === 'function'
          ) {
            refreshAllRecord();
            refreshWeightRank();
            refreshWaistlineRank();
          }
        })
        .catch((err) => {
          const { message } = err.response.data;
          Toast.fire({
            icon: 'error',
            title: '新增記錄失敗',
            text: message,
          });
        })
        .finally(() => {
          onSetIsFetching(false);
        });
    },
    [newRecord, refreshAllRecord, refreshWeightRank, refreshWaistlineRank, onSetIsFetching],
  );

  // close post new record modal
  const atCloseNewPostModal = React.useCallback(async () => {
    // 資料沒更新過就直接關閉
    if (
      newRecord.date === new Date().toDateString() &&
      !newRecord.weight &&
      !newRecord.waistline &&
      newRecord.description === '' &&
      !newRecord.sportCategoryId &&
      !newRecord.Images
    ) {
      setOpenModal(false);
      return;
    }
    // 資料有更新過就詢問是否離開
    const res = await Confirm('取消新增？', '如果離開，將不會新增你的記錄內容');
    if (res.isConfirmed) {
      setOpenModal(false);
      setNewRecord({
        date: new Date().toDateString(),
        weight: 0,
        waistline: 0,
        description: '',
        sportCategoryId: 0,
        Images: null,
      });
    }
  }, [newRecord]);

  // header icon button mouse enter event
  const atIconBtnMouseEnterHandler = React.useCallback((e: React.MouseEvent) => {
    const target = e.currentTarget;
    if (target.id !== 'hamburgerBtn') {
      // 一般icon button的放大效果
      target.firstElementChild?.classList.add('scale-110');
    } else {
      // 漢堡排 icon button的放大效果
      Array.from(target.firstElementChild?.children[1].children as HTMLCollection).forEach((item) =>
        item.classList.add('scale-110'),
      );
    }
  }, []);

  // header icon button mouse leave event
  const atIconBtnMouseLeaveHandler = React.useCallback((e: React.MouseEvent) => {
    const target = e.currentTarget;
    if (target.id !== 'hamburgerBtn') {
      // 一般icon button的放大效果
      target.firstElementChild?.classList.remove('scale-110');
    } else {
      // 漢堡排 icon button的放大效果
      Array.from(target.firstElementChild?.children[1].children as HTMLCollection).forEach((item) =>
        item.classList.remove('scale-110'),
      );
    }
  }, []);

  return (
    <header className='sticky top-0 z-50 border-b-[1px] border-gray-300 bg-white dark:bg-black'>
      <div className='box-border flex h-[60px] items-center justify-between px-2 lg:mx-auto lg:max-w-[1024px] lg:px-0'>
        {/* left logo */}
        <Link className='flex items-center' to='/fitness_record_frontend/'>
          <div className='mr-4 flex h-[48px] w-[48px] items-center'>
            <img src='images/logo.png' alt='logo' />
          </div>
          <h1 className='hidden font-bold dark:text-white lg:block'>健人日記</h1>
        </Link>
        {/* right nav  */}
        <div className='relative flex items-center'>
          <div className='hidden lg:block'>
            {/* home */}
            <button
              className='z-10 mr-4 rounded-lg p-2 hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'
              onClick={() => go('/fitness_record_frontend/')}
              onMouseEnter={(e) => atIconBtnMouseEnterHandler(e)}
              onMouseLeave={(e) => atIconBtnMouseLeaveHandler(e)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='z-20 h-6 w-6 duration-500'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                />
              </svg>
            </button>

            {/* following */}
            <button
              className='z-10 mr-4 rounded-lg p-2 hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'
              onClick={() => go('/fitness_record_frontend/following')}
              onMouseEnter={(e) => atIconBtnMouseEnterHandler(e)}
              onMouseLeave={(e) => atIconBtnMouseLeaveHandler(e)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='z-20 h-6 w-6 duration-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                />
              </svg>
            </button>

            {/* new post */}
            {user !== null && (
              <button
                className='z-10 mr-4 rounded-lg p-2 hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'
                onMouseEnter={(e) => atIconBtnMouseEnterHandler(e)}
                onMouseLeave={(e) => atIconBtnMouseLeaveHandler(e)}
                onClick={() => setOpenModal(true)}
              >
                <svg
                  className='z-20 h-6 w-6 duration-500 dark:text-white'
                  color='rgb(0, 0, 0)'
                  fill='rgb(0, 0, 0)'
                  height='24'
                  role='img'
                  viewBox='0 0 24 24'
                  width='24'
                >
                  <path
                    d='M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                  />
                  <line
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    x1='6.545'
                    x2='17.455'
                    y1='12.001'
                    y2='12.001'
                  />
                  <line
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    x1='12.003'
                    x2='12.003'
                    y1='6.545'
                    y2='17.455'
                  />
                </svg>
              </button>
            )}
          </div>

          {/* more actions */}
          <div
            className='relative z-10 rounded-lg px-2 py-[0.3rem] hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'
            onMouseEnter={(e) => atIconBtnMouseEnterHandler(e)}
            onMouseLeave={(e) => atIconBtnMouseLeaveHandler(e)}
            id='hamburgerBtn'
          >
            <FRHamburgerAnimated ref={buttonRef} />
            <FRPopoverPanel ref={divRef}>
              <>
                {/* profile && user login */}
                {user !== null ? (
                  // profile
                  <div className='mb-2'>
                    <button className='flex w-full items-center rounded-lg p-2 hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'>
                      {/* left icon */}
                      <div className='mr-3 h-[40px] w-[40px] overflow-hidden rounded-full'>
                        <img
                          src={user.avatar}
                          alt='avatar'
                          className='h-full w-full object-cover'
                        />
                      </div>

                      {/* right text */}
                      <div className='flex-1'>
                        <p className='mb-[2px] text-base text-black dark:text-white'>{user.name}</p>
                        <p className='hidden text-sm text-gray-400 lg:block'>查看你的個人檔案</p>
                      </div>
                    </button>
                  </div>
                ) : (
                  // user login
                  <div className='mb-2'>
                    <button
                      className='flex w-full items-center rounded-lg p-1 hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'
                      onClick={() => {
                        onSetOpenPanel(false);
                        go('/fitness_record_frontend/signin');
                      }}
                    >
                      {/* left icon */}
                      <div className='bg-fb-input flex items-center justify-center rounded-full p-2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={2}
                          stroke='currentColor'
                          className='h-7 w-7'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                          />
                        </svg>
                      </div>

                      {/* right text */}
                      <div className='flex-1'>
                        <p className='mb-[2px] text-base text-black dark:text-white'>登入</p>
                      </div>
                    </button>
                  </div>
                )}

                <div className='block lg:hidden'>
                  {/* 首頁 */}
                  <div className='mb-2'>
                    <button
                      className='flex w-full items-center rounded-lg p-1 hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'
                      onClick={() => {
                        onSetOpenPanel(false);
                        go('/fitness_record_frontend/');
                      }}
                    >
                      {/* left icon */}
                      <div className='bg-fb-input flex items-center justify-center rounded-full p-2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={2}
                          stroke='currentColor'
                          className='h-7 w-7'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                          />
                        </svg>
                      </div>

                      {/* right icon */}
                      <div className='flex-1'>
                        <p className='mb-[2px] text-base text-black dark:text-white'>首頁</p>
                      </div>
                    </button>
                  </div>

                  {/* following */}
                  <div className='mb-2'>
                    <button
                      className='flex w-full items-center rounded-lg p-1 hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'
                      onClick={() => {
                        onSetOpenPanel(false);
                        go('/fitness_record_frontend/following');
                      }}
                    >
                      {/* left icon */}
                      <div className='bg-fb-input flex items-center justify-center rounded-full p-2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-7 w-7'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                          />
                        </svg>
                      </div>

                      {/* right icon */}
                      <div className='flex-1'>
                        <p className='mb-[2px] text-base text-black dark:text-white'>好友</p>
                      </div>
                    </button>
                  </div>

                  {/* new post */}
                  {user !== null && (
                    <div className='mb-2'>
                      <button
                        className='flex w-full items-center rounded-lg p-1 hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'
                        onClick={() => {
                          setOpenModal(true);
                          onSetOpenPanel(false);
                        }}
                      >
                        {/* left icon */}
                        <div className='bg-fb-input flex items-center justify-center rounded-full p-2'>
                          <svg
                            className='h-7 w-7 dark:text-white'
                            color='rgb(0, 0, 0)'
                            fill='rgb(0, 0, 0)'
                            height='24'
                            role='img'
                            viewBox='0 0 24 24'
                            width='24'
                            stroke='currentColor'
                          >
                            <path
                              d='M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z'
                              fill='none'
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                            />
                            <line
                              fill='none'
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              x1='6.545'
                              x2='17.455'
                              y1='12.001'
                              y2='12.001'
                            />
                            <line
                              fill='none'
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              x1='12.003'
                              x2='12.003'
                              y1='6.545'
                              y2='17.455'
                            />
                          </svg>
                        </div>

                        {/* right icon */}
                        <div className='flex-1'>
                          <p className='mb-[2px] text-base text-black dark:text-white'>發佈貼文</p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {/* theme change */}
                <div className='mb-2 flex cursor-pointer items-center rounded-lg p-2 hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'>
                  {/* left icon */}
                  <div className='bg-fb-input mr-2 flex items-center justify-center rounded-full p-2'>
                    {isDark ? (
                      <svg
                        aria-label='主題圖示'
                        color='rgb(245, 245, 245)'
                        fill='rgb(245, 245, 245)'
                        height='24'
                        role='img'
                        viewBox='0 0 24 24'
                        width='24'
                      >
                        <title>主題圖示</title>
                        <path d='M11.502,22.99805A11.4313,11.4313,0,0,1,.49512,14.83691a.99889.99889,0,0,1,.251-.998,1.01148,1.01148,0,0,1,.99707-.249,9.43041,9.43041,0,0,0,2.75879.40821A9.5082,9.5082,0,0,0,13.5957,1.74023a1.00039,1.00039,0,0,1,1.24707-1.248A11.501,11.501,0,0,1,11.502,22.99805ZM3.08984,15.91211A9.49991,9.49991,0,0,0,21.002,11.498,9.57875,9.57875,0,0,0,15.916,3.08594,11.5083,11.5083,0,0,1,3.08984,15.91211Z' />
                      </svg>
                    ) : (
                      <svg
                        aria-label='主題圖示'
                        color='rgb(0, 0, 0)'
                        fill='rgb(0, 0, 0)'
                        height='24'
                        role='img'
                        viewBox='0 0 24 24'
                        width='24'
                      >
                        <title>主題圖示</title>
                        <path d='M12.00018,4.5a1,1,0,0,0,1-1V2a1,1,0,0,0-2,0V3.5A1.00005,1.00005,0,0,0,12.00018,4.5ZM5.28241,6.69678A.99989.99989,0,1,0,6.69647,5.28271l-1.06054-1.061A.99989.99989,0,0,0,4.22186,5.63574ZM4.50018,12a1,1,0,0,0-1-1h-1.5a1,1,0,0,0,0,2h1.5A1,1,0,0,0,4.50018,12Zm.78223,5.30322-1.06055,1.061a.99989.99989,0,1,0,1.41407,1.41406l1.06054-1.061a.99989.99989,0,0,0-1.41406-1.41407ZM12.00018,19.5a1.00005,1.00005,0,0,0-1,1V22a1,1,0,0,0,2,0V20.5A1,1,0,0,0,12.00018,19.5Zm6.71729-2.19678a.99989.99989,0,0,0-1.41406,1.41407l1.06054,1.061A.99989.99989,0,0,0,19.778,18.36426ZM22.00018,11h-1.5a1,1,0,0,0,0,2h1.5a1,1,0,0,0,0-2ZM18.01044,6.98975a.996.996,0,0,0,.707-.293l1.06055-1.061A.99989.99989,0,0,0,18.364,4.22168l-1.06054,1.061a1,1,0,0,0,.707,1.707ZM12.00018,6a6,6,0,1,0,6,6A6.00657,6.00657,0,0,0,12.00018,6Zm0,10a4,4,0,1,1,4-4A4.00458,4.00458,0,0,1,12.00018,16Z' />
                      </svg>
                    )}
                  </div>

                  {/* right text */}
                  <div className='hidden flex-1 lg:block'>
                    <p className='mb-[2px] text-base text-black dark:text-white'>深色模式</p>
                  </div>
                  <ToggleSwitch onSetIsDark={onSetIsDark} isDark={isDark} />
                </div>

                {/* user logout */}
                {user !== null && (
                  <div className='mb-2'>
                    <button
                      className='flex w-full items-center rounded-lg p-1 hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'
                      onClick={() => {
                        onLogout();
                        go('/fitness_record_frontend/');
                      }}
                    >
                      {/* left icon */}
                      <div className='bg-fb-input flex items-center justify-center rounded-full p-2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={2}
                          stroke='currentColor'
                          className='h-7 w-7'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
                          />
                        </svg>
                      </div>

                      {/* right icon */}
                      <div className='flex-1'>
                        <p className='mb-[2px] text-base text-black dark:text-white'>登出</p>
                      </div>
                    </button>
                  </div>
                )}
              </>
            </FRPopoverPanel>
          </div>
        </div>
      </div>
      <FRModal open={openModal} onClose={() => atCloseNewPostModal()}>
        {isFetching ? (
          <div className='flex h-[80%] flex-col items-center justify-center lg:h-[544px]'>
            <Loading />
            <div className='relative flex w-[68%] justify-center pt-4 text-start sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 lg:w-[35%]'>
              <p className='w-[34ch] animate-typing overflow-hidden whitespace-nowrap font-mono text-xl font-semibold text-gray-900 dark:text-white'>
                記錄上傳中，請稍候...
              </p>
            </div>
          </div>
        ) : (
          <FRPostFrom
            record={newRecord}
            sportCategories={allSportCategories as SportCategory[]}
            currentPage='newPost'
            openModal={openModal}
            onSubmit={atSubmitNewRecord}
            onSetNewRecord={setNewRecord}
          />
        )}
      </FRModal>
    </header>
  );
});

export default FRHeader;
