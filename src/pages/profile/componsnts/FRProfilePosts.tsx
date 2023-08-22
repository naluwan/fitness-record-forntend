/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Images, Record } from 'types';

type FRProfilePostsProps = {
  record: Record;
  images: Images[];
  onSetOpenModal: (open: boolean) => void;
  onSetSelectedRecord: (record: Record) => void;
};

const FRProfilePosts = React.forwardRef<HTMLElement, FRProfilePostsProps>((props, ref) => {
  const { record, images, onSetOpenModal, onSetSelectedRecord } = props;

  const recordBody = (
    <button
      className='group relative aspect-1 max-h-[350px] max-w-[350px]'
      onClick={() => {
        onSetSelectedRecord(record);
        onSetOpenModal(true);
      }}
    >
      <div className='absolute left-0 top-0 z-20 hidden h-full w-full bg-black/20 group-hover:block' />
      <img src={images.length ? images[0].url : ''} className='h-full w-full object-cover' alt='' />
    </button>
  );

  const content = ref ? <article ref={ref}>{recordBody}</article> : <article>{recordBody}</article>;

  return content;
});

export default React.memo(FRProfilePosts);
