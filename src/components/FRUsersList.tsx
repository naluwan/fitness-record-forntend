import React from 'react';
import { User } from 'types';
import FRUser from './FRUser';

type FRUsersListProps = {
  users: User[];
};

const FRUsersList: React.FC<FRUsersListProps> = (props) => {
  const { users } = props;
  const filteredUsers = users.map((user) => (
    <FRUser
      key={user.id}
      userId={user.id}
      size='medium'
      name={user.name}
      avatar={user.avatar}
      showFollow
    />
  ));

  const content = filteredUsers?.length ? (
    <div>{filteredUsers}</div>
  ) : (
    <article>
      <p>找不到查詢的資料</p>
    </article>
  );

  return content;
};

export default React.memo(FRUsersList);
