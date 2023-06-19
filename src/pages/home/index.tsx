import React from 'react';
import FRHeader, { IRef } from 'components/FRHeader';
import FRContainer from 'components/FRContainer';
import { useQuery } from 'react-query';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import { fetchRecords, fetchWaistlineRankUsers, fetchWeightRankUsers } from 'services/apis';
import Loading from 'components/Loading';
import FRPost from 'components/FRPost';
import FRRanking from 'components/FRRanking';
import { Images, SportCategory, User } from 'types';

const Home: React.FC = () => {
  const [weightRankUsers, setWeightRankUsers] = React.useState<User[] | []>([]);
  const [waistlineRankUsers, setWaistlineRankUsers] = React.useState<User[] | []>([]);

  const { user, records, onSetRecords, onSetOpenPanel } = useRecordStore((state) => {
    return {
      user: state.user,
      records: state.records,
      onSetRecords: state.onSetRecords,
      onSetOpenPanel: state.onSetOpenPanel,
    };
  }, shallow);

  const allRecords = useQuery('allRecords', fetchRecords);

  const weightRank = useQuery('weightRank', fetchWeightRankUsers);

  const waistlineRank = useQuery('waistlineRank', fetchWaistlineRankUsers);

  React.useEffect(() => {
    if (allRecords.isSuccess && !allRecords.isLoading && !allRecords.isError) {
      onSetRecords(allRecords.data.records);
    }

    if (weightRank.isSuccess && !weightRank.isLoading && !weightRank.isError) {
      setWeightRankUsers(weightRank.data.users);
    }

    if (waistlineRank.isSuccess && !waistlineRank.isLoading && !waistlineRank.isError) {
      setWaistlineRankUsers(waistlineRank.data.users);
    }
  }, [
    allRecords,
    onSetRecords,
    weightRank,
    setWeightRankUsers,
    waistlineRank,
    setWaistlineRankUsers,
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

  return (
    <>
      <FRHeader
        ref={panelRef}
        refreshAllRecord={allRecords.refetch}
        refreshWeightRank={weightRank.refetch}
        refreshWaistlineRank={waistlineRank.refetch}
      />
      <FRContainer>
        <div className='flex lg:justify-center'>
          {/* left */}
          <div className='w-full lg:w-[600px]'>
            {allRecords.isLoading ? (
              <div className='mt-20 flex w-full justify-center'>
                <Loading />
              </div>
            ) : (
              records.length > 0 &&
              records.map((record) => {
                const postUserInfo = record.User as User;
                const sportCategory = record.SportCategory as SportCategory;

                return (
                  <FRPost
                    key={record.id}
                    postUserId={postUserInfo.id}
                    postRecordId={record.id as number}
                    postUserName={postUserInfo.name}
                    date={record.date}
                    postUserAvatar={postUserInfo.avatar}
                    sportCategory={sportCategory.name}
                    weight={record.weight as number}
                    waistline={record.waistline as number}
                    description={record.description}
                    images={record.Images as Images[]}
                    currentUserId={user ? user.id : null}
                    onRefetch={allRecords.refetch}
                    onRefetchRank={atRefetchRankInfo}
                  />
                );
              })
            )}
          </div>
          {/* right */}
          <div className='hidden lg:block lg:w-[424px]'>
            <FRRanking
              title='減重'
              users={weightRankUsers as User[]}
              isLoading={weightRank.isLoading}
            />

            <FRRanking
              title='腰瘦'
              users={waistlineRankUsers as User[]}
              isLoading={waistlineRank.isLoading}
            />
          </div>
        </div>
      </FRContainer>
    </>
  );
};

export default Home;
