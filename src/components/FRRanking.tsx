import React from 'react';
import { User } from 'types';
import FRUser from './FRUser';

type FRRankingProps = {
  users: User[];
  title: string;
};

const FRRanking: React.FC<FRRankingProps> = (props) => {
  const { users, title } = props;

  return (
    <div className='ml-8 mt-8 box-border p-2 shadow-xl dark:shadow-gray-400/40'>
      <p className='text-center text-base font-bold'>{title}排行榜</p>
      <div>
        {users.map((user, idx) => {
          const { id, name, avatar } = user;
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
                <span>
                  <p className='text-xs'>目前體重：99公斤</p>
                  <p className='font-bold text-green-500'> - 5%</p>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FRRanking;
