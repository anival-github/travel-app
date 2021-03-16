import React from 'react';
import star from '../../assets/icons/star.png';

type ItemProps = {
  user: string
  rating: number
  comment: string
};

const ReviewItem:React.FC<ItemProps> = ({ user, rating, comment }:ItemProps) => (
  <div className="review-item">
    <div className="user-rating">
      <span>{user}</span>
      <span>
        {Math.round(rating)}
        <img className="rating-img" src={star} alt="rating" />
      </span>
    </div>
    <div>
      <span className="review-text">{comment}</span>
    </div>
  </div>
);

export default ReviewItem;
