import FRContainer from 'components/FRContainer';
import React from 'react';
import { useParams } from 'react-router-dom';
import FRHeader, { IRef } from 'components/FRHeader';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import FRProfilePosts from 'pages/profile/componsnts/FRProfilePosts';
import { fetchGetUser, UserProfileResponse } from 'services/apis';
import { useQuery } from 'react-query';
import Loading from 'components/Loading';
import FRUser from 'components/FRUser';
import FRModal from 'components/FRModal';
import type { Images, Record } from 'types';

const Profile: React.FC = () => {
  const { userId } = useParams();
  const { user, onSetOpenPanel } = useRecordStore((state) => {
    return {
      user: state.user,
      onSetOpenPanel: state.onSetOpenPanel,
    };
  }, shallow);

  // open modal
  const [openModal, setOpenModal] = React.useState(false);

  // selected record
  const [selectedRecord, setSelectedRecord] = React.useState<Record | null>(null);

  // images of selected record
  const [recordImages, setRecordImages] = React.useState<Images[] | null>(null);

  const [userInfo, setUserInfo] = React.useState<UserProfileResponse>({
    user: { id: 0, name: '', email: '', avatar: '' },
    records: [],
  });

  // set images of selected record
  React.useEffect(() => {
    if (selectedRecord !== null) {
      setRecordImages(selectedRecord.Images as Images[]);
    }
  }, [selectedRecord]);

  // fetch user info
  const { data, isError, isLoading, isFetching, isSuccess } = useQuery(['getUser', userId], () =>
    fetchGetUser(userId),
  );

  // set user info
  React.useEffect(() => {
    if (isSuccess && !isError && !isFetching && !isLoading) {
      setUserInfo(data);
    }
  }, [isSuccess, isError, isFetching, isLoading, data]);

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
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className='h-[120px] w-[120px] flex-shrink-0 overflow-hidden rounded-full'>
                <img
                  src={userInfo?.user.avatar}
                  alt='avatar'
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='ml-4 flex flex-1 flex-col p-5'>
                <div className='text-left text-[24px] font-bold'>{userInfo?.user.name}</div>
                <div className='mt-3 flex flex-col items-start justify-between lg:flex-row'>
                  <div className='mb-1 flex items-center justify-center text-[15px] text-black dark:text-white lg:mb-0 lg:text-[24px]'>
                    <div className='font-bold'>{userInfo?.records.length}</div>
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
            </>
          )}
        </div>

        <div className='mx-0 box-border border-t-2 border-t-gray-800 pt-2 lg:mx-4'>
          {isLoading ? (
            <Loading />
          ) : (
            <FRProfilePosts
              records={userInfo?.records}
              onSetOpenModal={setOpenModal}
              onSetSelectedRecord={setSelectedRecord}
            />
          )}
        </div>

        <FRModal open={openModal} currentPage='profilePost' onClose={() => setOpenModal(false)}>
          <div className='grid grid-cols-5'>
            <div className='col-span-3'>
              <img
                src={selectedRecord && recordImages?.length ? recordImages[0]?.url : ''}
                alt=''
                className='h-full w-full'
              />
            </div>
            <div className='col-span-2'>
              <div className='flex items-center'>
                <div className='flex-1'>
                  <FRUser
                    size='small'
                    userId={userInfo.user.id}
                    recordId={selectedRecord?.id}
                    name={userInfo.user.name}
                    avatar={userInfo.user.avatar}
                    target
                    showMore={user?.id === selectedRecord?.userId}
                  />
                </div>
                <div className='pr-5' />
              </div>
            </div>
          </div>
        </FRModal>
      </FRContainer>
    </>
  );
};

export default React.memo(Profile);
