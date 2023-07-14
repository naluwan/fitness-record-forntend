import FRContainer from 'components/FRContainer';
import React from 'react';
import { useParams } from 'react-router-dom';
import FRHeader, { IRef } from 'components/FRHeader';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import FRProfilePosts from 'pages/profile/componsnts/FRProfilePosts';
import {
  fetchAllSportCategories,
  fetchGetUser,
  fetchWaistlineRankUsers,
  fetchWeightRankUsers,
  UserProfileResponse,
} from 'services/apis';
import { useQuery } from 'react-query';
import Loading from 'components/Loading';
import FRUser from 'components/FRUser';
import FRModal from 'components/FRModal';
import type { Images, Record, SportCategory } from 'types';
import FRComment from 'components/FRComment';

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

  const [allSportCategories, setAllSportCategories] = React.useState<SportCategory[]>([]);

  React.useEffect(() => {
    if (selectedRecord !== null) {
      userInfo.records.forEach((record) => {
        if (record.id === selectedRecord.id) {
          setSelectedRecord(record);
        }
      });
    }
  }, [userInfo.records, selectedRecord]);

  // set images of selected record
  React.useEffect(() => {
    if (selectedRecord !== null) {
      setRecordImages(selectedRecord.Images as Images[]);
    }
  }, [selectedRecord]);

  const getAllSportCategories = useQuery('getAllSportCategories', fetchAllSportCategories);

  // fetch user info
  const { data, isError, isLoading, isFetching, isSuccess, refetch } = useQuery(
    ['getUser', userId],
    () => fetchGetUser(userId),
  );

  // set user info & set all sport categories
  React.useEffect(() => {
    if (isSuccess && !isError && !isFetching && !isLoading) {
      setUserInfo(data);
    }

    if (
      getAllSportCategories.isSuccess &&
      !getAllSportCategories.isLoading &&
      !getAllSportCategories.isError
    ) {
      setAllSportCategories(getAllSportCategories.data);
    }
  }, [isSuccess, isError, isFetching, isLoading, data, getAllSportCategories]);

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

  const weightRank = useQuery('weightRank', fetchWeightRankUsers);

  const waistlineRank = useQuery('waistlineRank', fetchWaistlineRankUsers);

  // 重新獲取rank資料 function
  const atRefetchRankInfo = React.useCallback(() => {
    weightRank.refetch();
    waistlineRank.refetch();
  }, [weightRank, waistlineRank]);

  return (
    <>
      <FRHeader ref={panelRef} allSportCategories={allSportCategories} />
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
            <div className='col-span-2 h-full max-h-[500px]'>
              <div className='flex h-full flex-col'>
                <div>
                  <FRUser
                    size='small'
                    userId={userInfo.user.id}
                    recordId={selectedRecord?.id}
                    name={userInfo.user.name}
                    avatar={userInfo.user.avatar}
                    target
                    showMore={user?.id === selectedRecord?.userId}
                    onRefetch={refetch}
                    onRefetchRank={atRefetchRankInfo}
                    onCloseModal={() => setOpenModal(false)}
                  />
                </div>
                <div className='no-scrollbar flex items-start overflow-auto'>
                  <FRComment
                    sportCategory={selectedRecord?.SportCategory?.name as string}
                    weight={selectedRecord?.weight as number}
                    waistline={selectedRecord?.waistline as number}
                    description={selectedRecord?.description as string}
                  />
                </div>
              </div>
            </div>
          </div>
        </FRModal>
      </FRContainer>
    </>
  );
};

export default React.memo(Profile);
