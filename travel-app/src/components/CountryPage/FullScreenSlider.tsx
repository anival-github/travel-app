import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation, Pagination, Controller, Thumbs,
} from 'swiper';

SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

interface FullScreenProps {
  isFull: boolean
  imgUrls: string[]
}

const FullScreenSlider:React.FC<FullScreenProps> = ({ isFull, imgUrls }: FullScreenProps) => {
  const fullScreenClasses = ['full-screen-slider'];

  if (isFull) {
    fullScreenClasses.push('visible');
  }

  return (
    <div className={fullScreenClasses.join(' ')}>
      <Swiper slidesPerView={1} navigation pagination>
        {imgUrls.map((item) => <SwiperSlide className="slide-full"><img className="fullscreen-photo" src={item} alt="slide" /></SwiperSlide>)}
      </Swiper>
    </div>
  );
};

export default FullScreenSlider;
