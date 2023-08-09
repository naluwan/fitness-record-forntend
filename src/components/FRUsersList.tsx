import React from 'react';
import { User } from 'types';
import FRUser from './FRUser';

type FRUsersListProps = {
  filteredUsers: User[];
};

const FRUsersList: React.FC<FRUsersListProps> = (props) => {
  const { filteredUsers } = props;
  const users = filteredUsers.map((user, idx) => (
    <div className='rounded-lg hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'>
      <FRUser
        key={user.id}
        userId={user.id}
        size='medium'
        name={user.name}
        avatar={user.avatar}
        showFollow
      />
    </div>
  ));

  const content = filteredUsers?.length ? (
    <div className='w-full'>{users}</div>
  ) : (
    <article>
      <p>找不到查詢的資料</p>
    </article>
  );

  return content;
};

export default React.memo(FRUsersList);
