import React from 'react';
import FRHeader from 'components/FRHeader';
import FRContainer from 'components/FRContainer';
import { useQuery } from 'react-query';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import { fetchRecords } from 'services/apis';
import Loading from 'components/Loading';
import FRPost from 'components/FRPost';
import FRRanking from 'components/FRRanking';

const Home: React.FC = () => {
  const { onSetRecords, records } = useRecordStore((state) => {
    return {
      records: state.records,
      onSetRecords: state.onSetRecords,
    };
  }, shallow);

  const { data, isSuccess, isLoading, isError } = useQuery('allRecords', fetchRecords);

  React.useEffect(() => {
    if (isSuccess && !isLoading && !isError) {
      onSetRecords(data.records);
    }
  });

  return (
    <>
      <FRHeader />
      <FRContainer>
        <div className='flex lg:justify-center'>
          {/* left */}
          <div className='w-full lg:w-[600px]'>
            {isLoading ? (
              <div className='flex justify-center mt-20 w-full'>
                <Loading />
              </div>
            ) : (
              records.length > 0 &&
              records.map((record) => {
                const user = record.User;
                return (
                  <FRPost
                    key={record.id}
                    name={user.name}
                    date={record.date}
                    avatar={user.avatar}
                    sportCategory={record.SportCategory.name}
                    weight={record.weight}
                    waistline={record.waistline}
                    description={record.description}
                    photo='https://i.imgur.com/pMVVEhb.jpeg'
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
