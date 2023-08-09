import React from 'react';
import FRHeader, { IRef } from 'components/FRHeader';
import FRContainer from 'components/FRContainer';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import FRRanking from 'components/FRRanking';
import { useQuery } from 'react-query';
import { fetchGetUsers, fetchWaistlineRankUsers, fetchWeightRankUsers } from 'services/apis';
import { User } from 'types';
import FRSearchBar from 'components/FRSearchBar';
import FRUsersList from 'components/FRUsersList';

const Ranking: React.FC = () => {
  const { onSetOpenPanel } = useRecordStore((state) => {
    return {
      onSetOpenPanel: state.onSetOpenPanel,
    };
  }, shallow);

  const [weightRankUsers, setWeightRankUsers] = React.useState<User[] | []>([]);
  const [waistlineRankUsers, setWaistlineRankUsers] = React.useState<User[] | []>([]);

  // 使用者搜尋框輸入的文字
  const [search, setSearch] = React.useState<string>('');
  // 從資料庫獲取到的所有使用者資料
  const [users, setUsers] = React.useState<User[] | []>([]);
  // 根據使用者搜尋框輸入的文字篩選出來的使用者
  const [filteredUsers, setFilteredUsers] = React.useState<User[] | []>([]);

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

  const getAllUsers = useQuery('getAllUsers', fetchGetUsers);

  React.useEffect(() => {
    if (getAllUsers.isSuccess && !getAllUsers.isLoading && !getAllUsers.isError) {
      setUsers(getAllUsers.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllUsers.data]);

  React.useEffect(() => {
    if (weightRank.isSuccess && !weightRank.isLoading && !weightRank.isError) {
      setWeightRankUsers(weightRank.data.users);
    }

    if (waistlineRank.isSuccess && !waistlineRank.isLoading && !waistlineRank.isError) {
      setWaistlineRankUsers(waistlineRank.data.users);
    }
  }, [weightRank, setWeightRankUsers, waistlineRank, setWaistlineRankUsers]);

  return (
    <>
      <FRHeader ref={panelRef} />
      <FRContainer>
        {/* search */}
        <div className='relative my-4 flex w-full justify-center lg:my-8 lg:justify-start'>
          <FRSearchBar
            users={users}
            search={search}
            onSetSearch={setSearch}
            onSetFilteredUsers={setFilteredUsers}
          />
          {search !== '' && (
            <div className='absolute left-5 top-12 box-border flex w-[90%] justify-center rounded-xl bg-[#1c1c1c] px-3 py-2 lg:left-0 lg:ml-4 lg:w-[480px]'>
              <FRUsersList filteredUsers={filteredUsers} />
            </div>
          )}
        </div>

        {/* ranking */}
        <div className='lg:mt-4 lg:flex lg:justify-center'>
          {/* left */}
          <div className='mb-4 box-border w-full shadow-xl dark:shadow-gray-400/40 lg:mx-4 lg:w-[512px]'>
            <FRRanking
              title='減重'
              users={weightRankUsers as User[]}
              isLoading={weightRank.isLoading}
              limit={10}
            />
          </div>
          {/* right */}
          <div className='mb-4 w-full shadow-xl dark:shadow-gray-400/40 lg:mx-4 lg:w-[512px]'>
            <FRRanking
              title='腰瘦'
              users={waistlineRankUsers as User[]}
              isLoading={waistlineRank.isLoading}
              limit={10}
            />
          </div>
        </div>
      </FRContainer>
    </>
  );
};

export default React.memo(Ranking);
