import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import { Images } from 'types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type FRSlidesProps = {
  images: Images[];
};

const FRSlides: React.FC<FRSlidesProps> = (props) => {
  const { images } = props;
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
            <img src={image.url} alt='post' className='max-h-[600px] w-full object-contain' />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default React.memo(FRSlides);
