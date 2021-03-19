import React, { useState } from 'react';
import star from '../../assets/icons/star.png';
import coment from '../../assets/icons/speech-bubble.png';
import ReviewItem from './ReviewItem';

interface RatingProps {
  rating: number
  comments: number
  classes: string
  placeReview: {
    _id: string;
    placeId: string;
    userLogin: string;
    rating: number;
    reviewText: string;
  }[]
}

const ImageRating:React.FC<RatingProps> = ({
  rating, comments, classes, placeReview,
}: RatingProps) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [rate, setRate] = useState(0);

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleRate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRate(parseInt(event.target.value, 10));
  };

  const handleSubmit = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = {
      placeId: placeReview[0].placeId,
      userLogin: 'User',
      rating: rate,
      reviewText: text,
    };
    setText('');
    setVisible(false);
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
            <button className="close-button" onClick={() => setVisible(false)} type="button">close</button>
            <div className="reviews">
              { placeReview ? placeReview.map((item) => (
                <ReviewItem user={item.userLogin} rating={item.rating} comment={item.reviewText} />
              )) : <span>loading</span>}
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
                <button type="button" onClick={() => handleSubmit()}>Отправить</button>
              </form>
            </div>
          </div>
        </div>
        <div onClick={() => setVisible(true)} role="presentation" className={ratingClasses.join(' ')}>
          <div className="rating">
            <span className={classes}>{rating}</span>
            <img className="rating-img" src={star} alt="rating star" />
          </div>
          <div className="comments">
            <span className={classes}>{comments}</span>
            <img className="rating-img" src={coment} alt="rating coment" />
          </div>
        </div>
      </>
    )
    : <div> loading</div>;
};
export default ImageRating;
