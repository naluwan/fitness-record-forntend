import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Images } from 'types';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type FRSlidesProps = {
  images: Images[];
  currentPage: 'edit' | 'post';
};

const FRSlides: React.FC<FRSlidesProps> = (props) => {
  const { images, currentPage } = props;

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      navigation
      pagination={{ clickable: false }}
    >
      {images.map((image) => {
        return (
          <SwiperSlide key={image.id}>
            <img
              src={image.url}
              alt='post'
              className={`w-full object-contain lg:w-[600px] ${
                currentPage === 'edit' && 'lg:min-h-[490px]'
              }`}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default React.memo(FRSlides);
