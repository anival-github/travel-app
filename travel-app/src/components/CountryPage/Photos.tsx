import React, { useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

interface PhotosProps {
  imgUrls: string[]
}

const Photos:React.FC<PhotosProps> = ({ imgUrls }: PhotosProps) => {
  const [activeImage, setActiveImage] = useState<number>(0);

  const handle = useFullScreenHandle();

  const activeImgHandler = (ind:number) => {
    setActiveImage(ind);
  };

  const wrapperClasses = ['photos-wrapper'];
  const imageClases = ['active-image'];
  const mainImageClasses = ['main-img'];

  if (handle.active) {
    wrapperClasses.push('photos-wrapper-fullscreen');
    imageClases.push('active-image-fullscreen');
    mainImageClasses.push('main-img-fullscreen');
  }

  return (
    <>
      <FullScreen handle={handle}>
        <div className={wrapperClasses.join(' ')}>
          <div className={imageClases.join(' ')}>
            <img
              className={mainImageClasses.join(' ')}
              onClick={handle.enter}
              onKeyPress={handle.enter}
              role="presentation"
              src={imgUrls[activeImage]}
              alt="active img"
            />
          </div>
          <div className="thumbs">
            {imgUrls.map((img, ind) => (
              <img
                onClick={() => activeImgHandler(ind)}
                onKeyPress={() => activeImgHandler(ind)}
                role="presentation"
                className={ind === activeImage ? 'thumb-img-active' : 'thumb-img'}
                src={img}
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
