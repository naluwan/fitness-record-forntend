import React from 'react';
import { User } from 'types';
import FRUser from './FRUser';
import RankingLoading from './RankingLoading';

type FRRankingProps = {
  users: User[];
  title: '減重' | '腰瘦';
  isLoading: boolean;
  limit: number;
  user?: User;
};

const FRRanking: React.FC<FRRankingProps> = (props) => {
  const { users, title, limit, isLoading, user } = props;

  const currentUsers = limit === 0 ? users : users.slice(0, limit);

  const onRanking = currentUsers.some((currentUser) => currentUser.id === user?.id);

  return (
    <>
      <p className='text-center text-base font-bold'>{title}排行榜</p>
      {isLoading ? (
        <>
          <RankingLoading />
          <RankingLoading />
          <RankingLoading />
        </>
      ) : (
        <div>
          {currentUsers.length > 0 &&
            currentUsers.map((currentUser, idx) => {
              const { id, name, avatar, nowWeight, nowWaistline, weightDiff, waistlineDiff } =
                currentUser;
              let currentClass;
              if (title === '減重') {
                currentClass = (weightDiff as number) > 0 ? 'text-red-500' : 'text-green-500';
              } else if (title === '腰瘦') {
                currentClass = (waistlineDiff as number) > 0 ? 'text-red-500' : 'text-green-500';
              }
              let ranking: number | string = '';
              switch (idx) {
                case 0:
                  ranking = 'https://i.imgur.com/PltVgVY.png';
                  break;
                case 1:
                  ranking = 'https://i.imgur.com/tDlT93s.png';
                  break;
                case 2:
                  ranking = 'https://i.imgur.com/36VoOCY.png';
                  break;
                default:
                  ranking = idx + 1;
              }
              return (
                <div className='flex items-center' key={id}>
                  {typeof ranking === 'string' ? (
                    <img
                      src={ranking}
                      alt='ranking img'
                      className='lazy h-[60px] w-[60px] overflow-hidden rounded-full object-contain'
                    />
                  ) : (
                    <div className='flex h-[60px] w-[60px] items-center justify-center'>
                      <h1 className='text-2xl font-bold'>{ranking}</h1>
                    </div>
                  )}
                  <div className='flex grow items-center'>
                    <div className='flex-1'>
                      <FRUser name={name} avatar={avatar} userId={id} />
                    </div>
                    <span className='flex-1'>
                      <p className='text-xs'>
                        {title === '減重'
                          ? `目前體重：${nowWeight}公斤`
                          : `目前腰圍：${nowWaistline}公分`}
                      </p>
                      <p className={`font-bold ${currentClass}`}>
                        {title === '減重' ? weightDiff : waistlineDiff}%
                      </p>
                    </span>
                  </div>
                </div>
              );
            })}
          {user && !onRanking && (
            <>
              <div className='flex justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z'
                  />
                </svg>
              </div>
              <div className='flex items-center'>
                <div className='flex h-[60px] w-[60px] items-center justify-center'>
                  <h1 className='text-2xl font-bold'>
                    {users.findIndex((findUser) => findUser.id === user?.id) + 1}
                  </h1>
                </div>
                <div className='flex grow items-center'>
                  <div className='flex-1 pl-4'>
                    <p className='font-bold'>你的排名</p>
                  </div>
                  <span className='flex-1 pr-4'>
                    <p className='text-xs'>
                      {title === '減重'
                        ? `目前體重：${user?.nowWeight}公斤`
                        : `目前腰圍：${user?.nowWaistline}公分`}
                    </p>
                    <p
                      className={`font-bold ${
                        (user?.weightDiff as number) > 0 || (user?.waistlineDiff as number) > 0
                          ? 'text-red-500'
                          : 'text-green-500'
                      }`}
                    >
                      {title === '減重' ? user?.weightDiff : user?.waistlineDiff}%
                    </p>
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default FRRanking;
