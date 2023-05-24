import React from 'react';
import { User } from 'types';
import FRUser from './FRUser';
import Loading from './Loading';

type FRRankingProps = {
  users: User[];
  title: '減重' | '腰瘦';
  isLoading: boolean;
};

const FRRanking: React.FC<FRRankingProps> = (props) => {
  const { users, title, isLoading } = props;

  return (
    <div className='ml-8 mt-8 box-border p-2 shadow-xl dark:shadow-gray-400/40'>
      <p className='text-center text-base font-bold'>{title}排行榜</p>
      {isLoading ? (
        <div className='my-10 flex w-full justify-center'>
          <Loading />
        </div>
      ) : (
        <div>
          {users.length > 0 &&
            users.map((user, idx) => {
              const { id, name, avatar, nowWeight, nowWaistline, weightDiff, waistlineDiff } = user;
              let currentClass;
              if (title === '減重') {
                currentClass = (weightDiff as number) > 0 ? 'text-red-500' : 'text-green-500';
              } else if (title === '腰瘦') {
                currentClass = (waistlineDiff as number) > 0 ? 'text-red-500' : 'text-green-500';
              }
              let ranking = '';
              switch (idx) {
                case 0:
                  ranking = 'https://i.imgur.com/PltVgVY.png';
                  break;
                case 1:
                  ranking = 'https://i.imgur.com/tDlT93s.png';
                  break;
                default:
                  ranking = 'https://i.imgur.com/36VoOCY.png';
              }
              return (
                <div className='flex items-center' key={id}>
                  <div
                    className='h-[60px] w-[60px] overflow-hidden rounded-full'
                    style={{
                      backgroundImage: `url(${ranking})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                  <div className='flex grow items-center'>
                    <div className='flex-1'>
                      <FRUser name={name} avatar={avatar} />
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
    </div>
  );
};

export default FRRanking;
