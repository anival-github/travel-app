import React, { useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ImageContainer from './ImageContainer';
import ImageRating from './ImageRating';

interface PhotosProps {
  imgUrls: any
}

const Photos:React.FC<PhotosProps> = ({ imgUrls }: PhotosProps) => {
  const [activeImage, setActiveImage] = useState<number>(0);

  const handle = useFullScreenHandle();

  const activeImgHandler = (ind:number) => {
    setActiveImage(ind);
  };

  const rightControlHandler = () => {
    if (activeImage < (imgUrls.length - 1)) {
      setActiveImage(activeImage + 1);
    }
  };

  const leftControlHandler = () => {
    if (activeImage > 0) {
      setActiveImage(activeImage - 1);
    }
  };

  const fullScreenHandler = () => {
    if (!handle.active) {
      handle.enter();
    }
  };

  const wrapperClasses = ['photos-wrapper'];
  const imageClases = ['active-image'];
  const mainImageClasses = ['main-img'];
  const descriptionClasses = ['description'];

  if (handle.active) {
    wrapperClasses.push('photos-wrapper-fullscreen');
    imageClases.push('active-image-fullscreen');
    mainImageClasses.push('main-img-fullscreen');
    descriptionClasses.push('description-fullscreen');
  }

  const reviews = [
    {
      _id: '604e61239dbcdb49fcc5681b', placeId: '604d396dbedd6044c481b2d6', userLogin: 'test2', rating: 4.181271732963752, reviewText: 'пример измененного отзыва# 27.039989280740873',
    },
    {
      _id: '604e612a9dbcdb49fcc5681d', placeId: '604d396dbedd6044c481b2d6', userLogin: 'test2', rating: 6, reviewText: 'пример отзыва# 61.344600528342475',
    },
    {
      _id: '604e6141cf754b4aa43047ec', placeId: '604d396dbedd6044c481b2d6', userLogin: 'test2', rating: 6, reviewText: 'пример отзыва# 92.13171813319731',
    },
    {
      _id: '604e614ccf754b4aa43047ee', placeId: '604d396dbedd6044c481b2d6', userLogin: 'test2', rating: 6, reviewText: 'пример отзыва# 47.862405272795925',
    },
    {
      _id: '604e633bcf754b4aa43047f0', placeId: '604d396dbedd6044c481b2d6', userLogin: 'test2', rating: 6, reviewText: 'пример отзыва# 62.825461464243794',
    },
    {
      _id: '604e637fcf754b4aa43047f2', placeId: '604d396dbedd6044c481b2d6', userLogin: 'test2', rating: 6, reviewText: 'пример отзыва# 99.44716265198676',
    },
    {
      _id: '604e6d9dd9b36d0015b08ea7', placeId: '604d396dbedd6044c481b2d6', userLogin: 'test2', rating: 6, reviewText: 'пример отзыва# 59.23662745347302',
    },
    {
      _id: '604e6df66aba2300157d9fc9', placeId: '604d396dbedd6044c481b2d6', userLogin: 'test2', rating: 6, reviewText: 'пример отзыва# 10.799722679660873',
    },
    {
      _id: '6051066df45eac0015d2fe8c', placeId: '604d396dbedd6044c481b2d6', userLogin: 'test2', rating: 6, reviewText: 'пример отзыва# 60.17363490988315',
    },
  ];

  return (
    <>
      <FullScreen handle={handle}>
        <div className={wrapperClasses.join(' ')}>
          <div className={imageClases.join(' ')}>
            <div
              onClick={rightControlHandler}
              onKeyPress={rightControlHandler}
              role="presentation"
              className="consrol-right"
            >
              &gt;
            </div>
            <div
              className="consrol-left"
              onClick={leftControlHandler}
              onKeyPress={leftControlHandler}
              role="presentation"
            >
              &lt;
            </div>
            <div style={{ position: 'relative' }}>
              <TransitionGroup>
                <CSSTransition
                  key={imgUrls[activeImage].imgUrl}
                  timeout={{ enter: 500 }}
                  classNames="fade"
                >
                  <ImageContainer handler={fullScreenHandler} classes={mainImageClasses.join(' ')} url={imgUrls[activeImage].imgUrl} />
                </CSSTransition>
              </TransitionGroup>
            </div>
          </div>
          <ImageRating placeReview={reviews} classes={descriptionClasses.join(' ')} rating={imgUrls[activeImage].rating} comments={23} />
          <div className={descriptionClasses.join(' ')}>
            {imgUrls[activeImage].description}
          </div>
          <div className="thumbs">
            {imgUrls.map((i: { imgUrl: string | undefined; }, ind: number) => (
              <img
                onClick={() => activeImgHandler(ind)}
                onKeyPress={() => activeImgHandler(ind)}
                role="presentation"
                className={ind === activeImage ? 'thumb-img-active' : 'thumb-img'}
                src={i.imgUrl}
                alt="thumb-img"
              />
            ))}
          </div>
        </div>
      </FullScreen>
    </>
  );
};

export default Photos;
