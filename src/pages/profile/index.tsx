import FRContainer from 'components/FRContainer';
import React from 'react';
import { useParams } from 'react-router-dom';

const Profile: React.FC = () => {
  const { userId } = useParams();
  return (
    <FRContainer>
      <div>
        top
        <p>userId: {userId}</p>
      </div>
      <div>down</div>
    </FRContainer>
  );
};

export default React.memo(Profile);
