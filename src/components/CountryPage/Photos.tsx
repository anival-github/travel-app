import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation, Pagination,
} from 'swiper';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import 'swiper/swiper-bundle.css';
import SlideItem from './SlideItem';
import FullScreenSlider from './FullScreenSlider';

SwiperCore.use([Navigation, Pagination]);

interface PhotosProps {
  imgUrls: string[]
}

const Photos:React.FC<PhotosProps> = ({ imgUrls }: PhotosProps) => {
  const [thumbs, setThumbs] = useState<null | SwiperCore>(null);
  const handle = useFullScreenHandle();

  return (
    <>
      <div className="photos-wrapper">
        <Swiper slidesPerView={1} className="main-photos" navigation pagination thumbs={{ swiper: thumbs }}>
          {imgUrls.map((i) => <SwiperSlide className="slide"><SlideItem fullScrrenHandler={handle.enter} imgUrl={i} itemDescription="slide description" itemRating={5} /></SwiperSlide>)}
        </Swiper>
        <Swiper className="thumbs-photo" spaceBetween={5} slidesPerView={imgUrls.length} onSwiper={setThumbs}>
          {imgUrls.map((i) => <SwiperSlide><img className="item-thumb" src={i} alt="thumbs" /></SwiperSlide>)}
        </Swiper>
      </div>
      <FullScreen handle={handle}>
        <FullScreenSlider imgUrls={imgUrls} isFull={handle.active} />
      </FullScreen>
    </>
  );
};

export default Photos;
