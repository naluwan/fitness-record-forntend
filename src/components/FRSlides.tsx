import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Images } from 'types';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type FRSlidesProps = {
  images: Images[] | { preview: string; name: string }[];
  currentPage: 'edit' | 'post' | 'newPost' | 'profilePost';
};

const FRSlides: React.FC<FRSlidesProps> = (props) => {
  const { images, currentPage } = props;

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: false }}
      initialSlide={0}
    >
      {currentPage === 'edit' || currentPage === 'post' || currentPage === 'profilePost'
        ? images.map((image) => {
            const currentImage = image as Images;
            return (
              <SwiperSlide key={currentImage.id}>
                <div className='aspect-1'>
                  <img src={currentImage.url} alt='post' className='h-full w-full object-contain' />
                </div>
              </SwiperSlide>
            );
          })
        : images.map((image) => {
            const currentImage = image as { preview: string; name: string };
            return (
              <SwiperSlide key={currentImage.name}>
                <img
                  src={currentImage.preview}
                  alt='post'
                  className='w-full object-contain lg:h-[490px]'
                />
              </SwiperSlide>
            );
          })}
    </Swiper>
  );
};

export default React.memo(FRSlides);
