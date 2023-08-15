import React from 'react';
import FRHeader, { IRef } from 'components/FRHeader';
import FRContainer from 'components/FRContainer';
import { useQuery, useInfiniteQuery } from 'react-query';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import {
  fetchAllSportCategories,
  fetchRecords,
  fetchWaistlineRankUsers,
  fetchWeightRankUsers,
} from 'services/apis';
import FRPost from 'components/FRPost';
import FRRanking from 'components/FRRanking';
import { Images, SportCategory, User } from 'types';
import PostLoading from 'components/PostLoading';

const Home: React.FC = () => {
  const [weightRankUsers, setWeightRankUsers] = React.useState<User[] | []>([]);
  const [waistlineRankUsers, setWaistlineRankUsers] = React.useState<User[] | []>([]);
  const [allSportCategories, setAllSportCategories] = React.useState<SportCategory[]>([]);

  const { user, onSetRecords, onSetOpenPanel } = useRecordStore((state) => {
    return {
      user: state.user,
      onSetRecords: state.onSetRecords,
      onSetOpenPanel: state.onSetOpenPanel,
    };
  }, shallow);

  // 獲取所有運動類別
  const getAllSportCategories = useQuery('getAllSportCategories', fetchAllSportCategories);

  // 使用react-query useInfiniteQuery來實現無限下拉載入資料的方式
  const allRecords = useInfiniteQuery(
    'allRecords',
    ({ pageParam = 1 }, limit = 5) => fetchRecords(pageParam, limit),
    {
      getNextPageParam: (lastPage, allPages) => {
        // 判斷lastPage是否有資料且資料數量如果小於limit設定的數字代表沒有下一頁
        return lastPage.length && lastPage.length === 5 ? allPages.length + 1 : undefined;
      },
    },
  );

  // 新增Intersection Observer(交叉觀察者)
  const intObserver = React.useRef<IntersectionObserver>();
  const lastPostRef = React.useCallback(
    (lastRecordElement: HTMLElement) => {
      if (allRecords.isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && allRecords.hasNextPage) {
          console.log('載入更多資料');
          allRecords.fetchNextPage();
        }
      });

      if (lastRecordElement) intObserver.current.observe(lastRecordElement);
    },
    [allRecords],
  );

  const weightRank = useQuery('weightRank', fetchWeightRankUsers);

  const waistlineRank = useQuery('waistlineRank', fetchWaistlineRankUsers);

  React.useEffect(() => {
    if (weightRank.isSuccess && !weightRank.isLoading && !weightRank.isError) {
      setWeightRankUsers(weightRank.data.users);
    }

    if (waistlineRank.isSuccess && !waistlineRank.isLoading && !waistlineRank.isError) {
      setWaistlineRankUsers(waistlineRank.data.users);
    }

    if (
      getAllSportCategories.isSuccess &&
      !getAllSportCategories.isLoading &&
      !getAllSportCategories.isError
    ) {
      setAllSportCategories(getAllSportCategories.data);
    }
  }, [
    allRecords,
    onSetRecords,
    weightRank,
    setWeightRankUsers,
    waistlineRank,
    setWaistlineRankUsers,
    getAllSportCategories,
  ]);

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

  // 重新獲取rank資料 function
  const atRefetchRankInfo = React.useCallback(() => {
    weightRank.refetch();
    waistlineRank.refetch();
  }, [weightRank, waistlineRank]);

  const content = allRecords.data?.pages.map((pg) => {
    return pg.map((record, i) => {
      // 如果record是最後一筆，就加上lastPostRef，讓最後一筆記錄加上交叉觀察者以便載入後面資料
      if (pg.length === i + 1) {
        return (
          <FRPost
            ref={lastPostRef}
            key={record.id}
            postUserId={record.User?.id as number}
            postRecordId={record.id as number}
            postUserName={record.User?.name as string}
            date={record.date}
            postUserAvatar={record.User?.avatar as string}
            sportCategory={record.SportCategory?.name as string}
            weight={record.weight as number}
            waistline={record.waistline as number}
            description={record.description}
            images={record.Images as Images[]}
            currentUserId={user ? user.id : null}
            onRefetch={allRecords.refetch}
            onRefetchRank={atRefetchRankInfo}
          />
        );
      }
      return (
        <FRPost
          key={record.id}
          postUserId={record.User?.id as number}
          postRecordId={record.id as number}
          postUserName={record.User?.name as string}
          date={record.date}
          postUserAvatar={record.User?.avatar as string}
          sportCategory={record.SportCategory?.name as string}
          weight={record.weight as number}
          waistline={record.waistline as number}
          description={record.description}
          images={record.Images as Images[]}
          currentUserId={user ? user.id : null}
          onRefetch={allRecords.refetch}
          onRefetchRank={atRefetchRankInfo}
        />
      );
    });
  });

  // 判斷是否在載入新資料
  const isFetchingContent = allRecords.isFetching ? (
    <>
      {content}
      <>
        <PostLoading />
        <PostLoading />
      </>
    </>
  ) : (
    content
  );

  // 剛進Profile讀取資料等待畫面
  const currentContent = allRecords.isLoading ? (
    <>
      <PostLoading />
      <PostLoading />
    </>
  ) : (
    isFetchingContent
  );

  return (
    <>
      <FRHeader
        ref={panelRef}
        allSportCategories={allSportCategories}
        refreshAllRecord={allRecords.refetch}
        refreshWeightRank={weightRank.refetch}
        refreshWaistlineRank={waistlineRank.refetch}
      />
      <FRContainer>
        <div className='flex lg:justify-center'>
          {/* left */}
          <div className='w-full lg:w-[600px]'>{currentContent}</div>
          {/* right */}
          <div className='hidden lg:block lg:w-[424px]'>
            <div className='ml-8 mt-8 box-border p-2 shadow-xl dark:shadow-gray-400/40'>
              <FRRanking
                title='減重'
                users={weightRankUsers as User[]}
                isLoading={weightRank.isLoading}
                limit={3}
              />
            </div>

            <div className='ml-8 mt-8 box-border p-2 shadow-xl dark:shadow-gray-400/40'>
              <FRRanking
                title='腰瘦'
                users={waistlineRankUsers as User[]}
                isLoading={waistlineRank.isLoading}
                limit={3}
              />
            </div>
          </div>
        </div>
      </FRContainer>
    </>
  );
};

export default Home;
