import React from 'react';

type FRContainerProps = {
  children: React.ReactNode;
};

const FRContainer: React.FC<FRContainerProps> = (props) => {
  const { children } = props;
  return <div className='max-w-[1024px] my-0 mx-auto lg:max-w-[1024px]'>{children}</div>;
};

export default FRContainer;
