import React from 'react';
import FRHeader, { IRef } from 'components/FRHeader';
import FRContainer from 'components/FRContainer';
import { useQuery } from 'react-query';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import { fetchRecords } from 'services/apis';
import Loading from 'components/Loading';
import FRPost from 'components/FRPost';
import FRRanking from 'components/FRRanking';
import { SportCategory, User } from 'types';

const Home: React.FC = () => {
  const { user, records, onSetRecords, onSetOpenPanel } = useRecordStore((state) => {
    return {
      user: state.user,
      records: state.records,
      onSetRecords: state.onSetRecords,
      onSetOpenPanel: state.onSetOpenPanel,
    };
  }, shallow);

  const { data, isSuccess, isLoading, isError, refetch } = useQuery('allRecords', fetchRecords);

  React.useEffect(() => {
    if (isSuccess && !isLoading && !isError) {
      onSetRecords(data.records);
    }
  });

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
        <div className='flex lg:justify-center'>
          {/* left */}
          <div className='w-full lg:w-[600px]'>
            {isLoading ? (
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
                    postRecordId={record.id}
                    postUserName={postUserInfo.name}
                    date={record.date}
                    postUserAvatar={postUserInfo.avatar}
                    sportCategory={sportCategory.name}
                    weight={record.weight}
                    waistline={record.waistline}
                    description={record.description}
                    photo='https://i.imgur.com/pMVVEhb.jpeg'
                    currentUserId={user ? user.id : null}
                    onRefetch={refetch}
                  />
                );
              })
            )}
          </div>
          {/* right */}
          <div className='hidden lg:block lg:w-[424px]'>
            <FRRanking
              title='減重'
              users={[
                {
                  id: 4,
                  name: 'naluwan',
                  email: 'example@example.com',
                  avatar: 'https://i.imgur.com/pMVVEhb.jpeg',
                },
                {
                  id: 5,
                  name: 'Nonna',
                  email: 'nonna@example.com',
                  avatar: 'https://i.imgur.com/8lvq2X8.jpeg',
                },
              ]}
            />
          </div>
        </div>
      </FRContainer>
    </>
  );
};

export default Home;
