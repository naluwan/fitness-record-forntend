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
  fetchRecords,
  fetchWaistlineRankUsers,
  fetchWeightRankUsers,
  UserProfileResponse,
} from 'services/apis';
import { useQuery, useInfiniteQuery } from 'react-query';
import Loading from 'components/Loading';
import FRUser from 'components/FRUser';
import FRModal from 'components/FRModal';
import type { Images, Record, SportCategory } from 'types';
import FRComment from 'components/FRComment';
import FRSlides from 'components/FRSlides';
import ProfilePostLoading from 'components/ProfilePostLoading';

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

  // 使用react-query useInfiniteQuery來實現無限下拉載入資料的方式
  const allProfilePosts = useInfiniteQuery(
    'allProfilePosts',
    ({ pageParam = 1 }, limit = 9, id = Number(userId)) => fetchRecords(pageParam, limit, id),
    {
      getNextPageParam: (lastPage, allPages) => {
        // 判斷lastPage是否有資料且資料數量如果小於limit設定的數字代表沒有下一頁
        return lastPage.length && lastPage.length === 9 ? allPages.length + 1 : undefined;
      },
      structuralSharing: false,
    },
  );

  // 新增Intersection Observer(交叉觀察者)
  const intObserver = React.useRef<IntersectionObserver>();
  const lastPostRef = React.useCallback(
    (lastRecordElement: HTMLElement) => {
      if (allProfilePosts.isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && allProfilePosts.hasNextPage) {
          allProfilePosts.fetchNextPage();
        }
      });

      if (lastRecordElement) intObserver.current.observe(lastRecordElement);
    },
    [allProfilePosts],
  );

  const content = allProfilePosts.data?.pages.map((pg, i) => {
    return (
      <div
        className='grid grid-cols-3 gap-1'
        key={
          allProfilePosts.data.pageParams[i] === undefined
            ? 1
            : (allProfilePosts.data.pageParams[i] as number)
        }
      >
        {pg.map((record, j) => {
          if (pg.length === j + 1) {
            return (
              <FRProfilePosts
                key={record.id}
                ref={lastPostRef}
                record={record}
                images={record.Images as Images[]}
                onSetOpenModal={setOpenModal}
                onSetSelectedRecord={setSelectedRecord}
              />
            );
          }
          return (
            <FRProfilePosts
              key={record.id}
              record={record}
              images={record.Images as Images[]}
              onSetOpenModal={setOpenModal}
              onSetSelectedRecord={setSelectedRecord}
            />
          );
        })}
      </div>
    );
  });

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

  // 判斷是否在載入新資料
  const isFetchingContent = allProfilePosts.isFetching ? (
    <>
      {content}
      <div className='grid grid-cols-3 gap-1'>
        <ProfilePostLoading />
        <ProfilePostLoading />
        <ProfilePostLoading />
      </div>
    </>
  ) : (
    content
  );

  // 剛進Profile讀取資料等待畫面
  const currentContent = allProfilePosts.isLoading ? (
    <div className='grid grid-cols-3 gap-1'>
      <ProfilePostLoading />
      <ProfilePostLoading />
      <ProfilePostLoading />
    </div>
  ) : (
    isFetchingContent
  );

  return (
    <>
      <FRHeader
        ref={panelRef}
        allSportCategories={allSportCategories}
        refreshAllRecord={refetch}
        refreshWaistlineRank={waistlineRank.refetch}
        refreshWeightRank={weightRank.refetch}
      />
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
          {currentContent}
        </div>

        <FRModal
          key={selectedRecord?.id}
          open={openModal}
          currentPage='profilePost'
          onClose={() => setOpenModal(false)}
        >
          <div className='flex flex-col lg:grid lg:grid-cols-5'>
            <div className='sticky top-0 bg-white dark:bg-black lg:hidden'>
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
            <div className='aspect-1 h-full w-full lg:col-span-3'>
              <FRSlides
                images={selectedRecord && recordImages?.length ? (recordImages as Images[]) : []}
                currentPage='profilePost'
              />
            </div>
            <div className='lg:col-span-2 lg:h-full lg:max-h-[500px]'>
              <div className='flex flex-col lg:h-full'>
                <div className='hidden lg:block'>
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
