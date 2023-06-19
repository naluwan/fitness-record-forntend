import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Images } from 'types';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type FRSlidesProps = {
  images: Images[] | { preview: string; name: string }[];
  currentPage: 'edit' | 'post' | 'newPost';
};

const FRSlides: React.FC<FRSlidesProps> = (props) => {
  const { images, currentPage } = props;

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      slidesPerView={1}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
      navigation
      pagination={{ clickable: false }}
    >
      {currentPage === 'edit' || currentPage === 'post'
        ? images.map((image) => {
            const currentImage = image as Images;
            return (
              <SwiperSlide key={currentImage.id}>
                <img
                  src={currentImage.url}
                  alt='post'
                  className={`w-full object-contain lg:w-[600px] ${
                    currentPage === 'edit' && 'lg:h-[490px]'
                  }`}
                />
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
