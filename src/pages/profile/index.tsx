import FRContainer from 'components/FRContainer';
import React from 'react';
// import { useParams } from 'react-router-dom';
import FRHeader, { IRef } from 'components/FRHeader';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import FRProfilePosts from 'pages/profile/componsnts/FRProfilePosts';

const Profile: React.FC = () => {
  // const { userId } = useParams();
  const { onSetOpenPanel } = useRecordStore((state) => {
    return {
      onSetOpenPanel: state.onSetOpenPanel,
    };
  }, shallow);

  // popover panel ref
  const panelRef = React.useRef<IRef>(null);

  // 畫面點擊時，如果element沒有包含在popoverRef底下的話，就關閉panel
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
        <div className='box-border flex h-[180px] items-center px-4'>
          <div
            className='h-[120px] w-[120px] overflow-hidden rounded-full'
            style={{
              backgroundImage: 'url(https://i.imgur.com/SOVduI2.jpg)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
          <div className='ml-4 flex flex-1 flex-col p-5'>
            <div className='text-left text-[24px] font-bold'>NaLuWan</div>
            <div className='mt-3 flex flex-col items-start justify-between lg:flex-row'>
              <div className='mb-1 flex items-center justify-center text-[15px] text-black dark:text-white lg:mb-0 lg:text-[24px]'>
                <div className='font-bold'>50</div>
                <div>則貼文數</div>
              </div>
              <div className='mb-1 flex items-center justify-center text-[15px] text-black dark:text-white lg:mb-0 lg:text-[24px]'>
                <div className='font-bold'>100</div>
                <div>位粉絲</div>
              </div>
              <div className='mb-1 flex items-center justify-center text-[15px] text-black dark:text-white lg:mb-0 lg:text-[24px]'>
                <div className='font-bold'>5</div>
                <div>位追蹤</div>
              </div>
            </div>
          </div>
        </div>

        <div className='mx-0 box-border border-t-2 border-t-gray-800 pt-2 lg:mx-4'>
          <FRProfilePosts />
        </div>
      </FRContainer>
    </>
  );
};

export default React.memo(Profile);
