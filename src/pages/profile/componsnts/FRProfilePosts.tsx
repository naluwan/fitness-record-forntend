import React from 'react';
import { Images, Record } from 'types';

type FRProfilePostsProps = {
  records: Record[];
  onSetOpenModal: (open: boolean) => void;
  onSetSelectedRecord: (record: Record) => void;
};

const FRProfilePosts: React.FC<FRProfilePostsProps> = (props) => {
  const { records, onSetOpenModal, onSetSelectedRecord } = props;

  return (
    <div className='grid grid-cols-3 gap-1'>
      {records.length &&
        records.map((record) => {
          const images = record.Images as Images[];
          return (
            <button
              key={record.id}
              className='group relative aspect-1 max-h-[350px] max-w-[350px]'
              onClick={() => {
                onSetSelectedRecord(record);
                onSetOpenModal(true);
              }}
            >
              <div className='absolute left-0 top-0 z-20 hidden h-full w-full bg-black/20 group-hover:block' />
              <img
                src={images.length ? images[0].url : ''}
                className='h-full w-full object-cover'
                alt=''
              />
            </button>
          );
        })}
    </div>
  );
};

export default React.memo(FRProfilePosts);
