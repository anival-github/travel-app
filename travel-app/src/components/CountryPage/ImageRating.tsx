import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import star from '../../assets/icons/star.png';
import coment from '../../assets/icons/speech-bubble.png';
import ReviewItem from './ReviewItem';
import { editPlaceReviewData } from '../../redux/country-page-reducer';

type RatingProps = {
  addReview(data: any, token: string): void
  placeId: string
  classes: string
  user: any,
  placeReview: any
};

type MapStateToPropsType = {
  placeReview: any
};

type MapDispatchToPropsType = {
  editPlaceReviewData: (data: any) => Promise<void>,
};

type PropsType = RatingProps & MapStateToPropsType & MapDispatchToPropsType;

const ImageRating:React.FC<PropsType> = ({
  classes, placeReview, user, addReview, placeId, editPlaceReviewData,
}: PropsType) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [rate, setRate] = useState(0);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(0);

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleRate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRate(parseInt(event.target.value, 10));
  };

  const averageRating = Array.isArray(placeReview)
    ? placeReview.reduce((acc: number, item: any) => acc + item.rating,
      0) : 0;

  const handleSubmit = () => {
    if (editing) {
      const data = {
      // eslint-disable-next-line no-underscore-dangle
        reviewId: placeReview[editingId]._id,
        updateFields: {
          rating: rate,
          reviewText: text,
        },
        token: user.token,
      };
      editPlaceReviewData(data);
      setText('');
      setRate(0);
      setEditing(false);
    } else {
      const data = {
        placeId,
        userLogin: user.user ? user.user.login : 'anonymous',
        rating: rate,
        reviewText: text,
      };
      addReview(data, user.token);
      setText('');
      setVisible(false);
    }
  };

  const editReviewHandler = (id: number) => {
    setText(placeReview[id].reviewText);
    setRate(placeReview[id].rating);
    setEditingId(id);
    setEditing(true);
  };

  const modalClasses = ['modal-wrapper'];
  const ratingClasses = ['rating-wrapper'];

  if (visible) {
    modalClasses.push('visible');
  } else { ratingClasses.push('visible'); }

  return placeReview
    ? (
      <>
        <div className={modalClasses.join(' ')}>
          <div className="places-modal">
            <div className="reviews">
              { placeReview.length > 0 ? placeReview.map((item: any, index: number) => (
                <ReviewItem
                  // eslint-disable-next-line no-underscore-dangle
                  id={item._id}
                  index={index}
                  editReview={editReviewHandler}
                  user={item.userLogin}
                  rating={item.rating}
                  key={item.rating + item.reviewText}
                  comment={item.reviewText}
                />
              )) : <span style={{ margin: '0 10px' }}>no data</span>}
            </div>
            <div className="add-review">
              <form>
                <label htmlFor="text">
                  Отзыв
                  <input onChange={(e) => handleText(e)} value={text} type="text" name="text" />
                </label>
                <label htmlFor="rate">
                  Оценка
                  <input onChange={(e) => handleRate(e)} value={rate} type="range" name="rate" min="0" max="10" />
                  {rate}
                </label>
                <button type="button" onClick={() => handleSubmit()}>{editing ? 'Сохранить' : 'Отправить'}</button>
                <button className="close-button" onClick={() => setVisible(false)} type="button">закрыть</button>
              </form>
            </div>
          </div>
        </div>
        <div onClick={() => setVisible(true)} role="presentation" className={ratingClasses.join(' ')}>
          <div className="rating">
            <span className={classes}>
              {placeReview.length > 0
                ? (Math.round((averageRating / placeReview.length) * 10) / 10)
                : 0}
            </span>
            <img className="rating-img" src={star} alt="rating star" />
          </div>
          <div className="comments">
            <span className={classes}>{placeReview.length}</span>
            <img className="rating-img" src={coment} alt="rating coment" />
          </div>
        </div>
      </>
    )
    : <div> loading</div>;
};

const mapStateToProps = (state: AppStateType) => ({
  placeReview: state.places.placeReviewsData,
});

export default connect(mapStateToProps, { editPlaceReviewData })(ImageRating);
