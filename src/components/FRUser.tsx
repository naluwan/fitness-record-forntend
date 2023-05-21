import React from 'react';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import { Toast } from 'services/apis';

type FRUserProps = {
  size?: 'medium' | 'small';
  name?: string;
  date?: string;
  showFollow?: boolean;
  isFollowing?: boolean;
  avatar?: string;
  userId?: number;
  recordId?: number;
  showMore?: boolean;
  onRefetch?: () => void;
};

const FRUser: React.FC<FRUserProps> = (props) => {
  const {
    size = 'small',
    name,
    date,
    showFollow,
    isFollowing,
    avatar,
    userId,
    recordId,
    showMore = false,
    onRefetch,
  } = props;

  const [openPanel, setOpenPanel] = React.useState(false);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  // 畫面點擊時，如果element沒有包含在popoverRef底下的話，就關閉panel
  window.addEventListener('mousedown', (e) => {
    if (
      panelRef.current &&
      buttonRef.current &&
      !panelRef.current.contains(e.target as HTMLElement) &&
      !buttonRef.current.contains(e.target as HTMLElement)
    ) {
      setOpenPanel(false);
    }
  });

  const { isFetching, onDeleteRecord } = useRecordStore((state) => {
    return {
      isFetching: state.isFetching,
      onDeleteRecord: state.onDeleteRecord,
    };
  }, shallow);

  const atDeleteRecord = React.useCallback(
    (id: number) => {
      onDeleteRecord(id)
        .then(() => {
          if (typeof onRefetch === 'function') {
            onRefetch();
          }
          Toast.fire({
            icon: 'success',
            title: '刪除記錄成功',
          });
        })
        .catch((err) => {
          Toast.fire({
            icon: 'error',
            title: '刪除記錄失敗',
            text: err.response.data.message,
          });
        });
    },
    [onRefetch, onDeleteRecord],
  );

  // TODO: user id
  console.log('user id ==> ', userId);

  return (
    <div className='box-border flex h-[70px] items-center px-4'>
      <div
        className={`${
          size === 'small' ? 'h-[40px] w-[40px]' : 'h-[60px] w-[60px]'
        } overflow-hidden rounded-full`}
        style={{
          backgroundImage: `url(${avatar})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      <div className='ml-4'>
        <p className='text-sm font-bold'>{name}</p>
        <p className='text-xs text-gray-400'>{date}</p>
      </div>
      {showMore && (
        <div className='relative ml-auto'>
          <button onClick={() => setOpenPanel((prev) => !prev)} ref={buttonRef}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6 hover:text-[#e6e6e6] dark:hover:text-gray-500'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>
          </button>

          {/* more popover panel */}
          <div
            className={`lg:w-[250px]; duration-5000 absolute right-0 top-8 w-[110px] rounded-lg border border-[#efefef]  bg-white p-2 shadow-lg transition ease-in-out dark:bg-[#262626] ${
              openPanel ? 'block' : 'hidden'
            } lg:left-7 lg:top-0`}
            ref={panelRef}
          >
            {/* 編輯 */}
            <div className='mb-1 rounded-lg p-1 hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'>
              <button className='flex w-full items-center'>
                {/* left icon */}
                <div className='bg-fb-input flex items-center justify-center rounded-full p-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-4 w-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                    />
                  </svg>
                </div>

                {/* right text */}
                <div className='flex-1'>
                  <p className='mb-[1px] text-base text-black dark:text-white'>編輯</p>
                </div>
              </button>
            </div>

            {/* 刪除 */}
            <div className='mb-1 rounded-lg p-1 hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'>
              <button
                className='flex w-full items-center'
                onClick={() => atDeleteRecord(recordId as number)}
                disabled={isFetching}
              >
                {/* left icon */}
                <div className='bg-fb-input flex items-center justify-center rounded-full p-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-4 w-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                    />
                  </svg>
                </div>

                {/* right text */}
                <div className='flex-1'>
                  <p className='mb-[1px] text-base text-red-600'>刪除</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      {showFollow && (
        <button
          className={`${isFollowing ? 'text-gray-700' : 'text-blue-400'} ml-auto text-xs font-bold`}
        >
          {isFollowing ? '追蹤中' : '追蹤'}
        </button>
      )}
    </div>
  );
};

export default React.memo(FRUser);
