import React, { useState, useEffect } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { getPlaceReviewData, putPlaceReviewDataThunk } from '../../redux/country-page-reducer';
import ImageContainer from './ImageContainer';
import ImageRating from './ImageRating';
import Spinner from './spinner/Spinner';

type MapStateToPropsType = {
  userState: any
  allPlaces: any
};

type MapDispatchToPropsType = {
  getPlaceReviewData: (id: string) => Promise<void>,
  putPlaceReviewDataThunk: (data: any, token: string) => Promise<void>,
};

interface PhotosProps {
  allPlaces: any
  lang: string
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & PhotosProps;

const Photos:React.FC<PropsType> = ({
  allPlaces,
  getPlaceReviewData,
  putPlaceReviewDataThunk,
  lang,
  userState,
}: PropsType) => {
  const [activeImage, setActiveImage] = useState<number>(0);

  useEffect(() => {
    if (allPlaces) {
      // eslint-disable-next-line no-underscore-dangle
      getPlaceReviewData(allPlaces[activeImage]._id);
    }
  }, [activeImage, allPlaces]);

  const handle = useFullScreenHandle();

  const activeImgHandler = (ind:number) => {
    setActiveImage(ind);
  };

  const rightControlHandler = () => {
    if (activeImage < (allPlaces.length - 1)) {
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
  const rateClasses = ['rating-main'];

  if (handle.active) {
    wrapperClasses.push('photos-wrapper-fullscreen');
    imageClases.push('active-image-fullscreen');
    mainImageClasses.push('main-img-fullscreen');
    descriptionClasses.push('description-fullscreen');
    rateClasses.push('description-fullscreen');
  }

  if (allPlaces) {
    const localisations = allPlaces[activeImage].localizations;
    const localisation = localisations.find((elem: any) => elem.lang === lang);

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
                    key={allPlaces[activeImage].photoUrl}
                    timeout={{ enter: 500 }}
                    classNames="fade"
                  >
                    <ImageContainer handler={fullScreenHandler} classes={mainImageClasses.join(' ')} url={allPlaces[activeImage].photoUrl} />
                  </CSSTransition>
                </TransitionGroup>
              </div>
            </div>
            {/* eslint-disable-next-line no-underscore-dangle */}
            <ImageRating placeId={allPlaces[activeImage]._id} addReview={putPlaceReviewDataThunk} user={userState} classes={rateClasses.join(' ')} />
            <div className={descriptionClasses.join(' ')}>
              {localisation.description}
            </div>
            <div className="thumbs">
              {allPlaces.map((i: any, ind: number) => (
                <img
                  onClick={() => activeImgHandler(ind)}
                  onKeyPress={() => activeImgHandler(ind)}
                  role="presentation"
                  className={ind === activeImage ? 'thumb-img-active' : 'thumb-img'}
                  src={i.photoUrl}
                  key={i.photoUrl}
                  alt="thumb-img"
                />
              ))}
            </div>
          </div>
        </FullScreen>
      </>
    );
  }
  return <Spinner />;
};

const mapStateToProps = (state: AppStateType) => ({
  userState: state.userState,
  allPlaces: state.places.allPlacesData,
});

export default connect(mapStateToProps, { getPlaceReviewData, putPlaceReviewDataThunk })(Photos);
