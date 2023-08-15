import React from 'react';
import { User } from 'types';
import FRUser from './FRUser';
import RankingLoading from './RankingLoading';

type FRRankingProps = {
  users: User[];
  title: '減重' | '腰瘦';
  isLoading: boolean;
  limit: number;
};

const FRRanking: React.FC<FRRankingProps> = (props) => {
  const { users, title, limit, isLoading } = props;

  const currentUsers = limit === 0 ? users : users.slice(0, limit);

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
            currentUsers.map((user, idx) => {
              const { id, name, avatar, nowWeight, nowWaistline, weightDiff, waistlineDiff } = user;
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
        </div>
      )}
    </>
  );
};

export default FRRanking;
