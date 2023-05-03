import React from 'react';

type FRContainerProps = {
  children: React.ReactNode;
};

const FRContainer: React.FC<FRContainerProps> = (props) => {
  const { children } = props;
  return <div className='mx-auto my-0 max-w-[1024px] lg:max-w-[1024px]'>{children}</div>;
};

export default FRContainer;
