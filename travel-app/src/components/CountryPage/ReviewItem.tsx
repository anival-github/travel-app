import React from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import star from '../../assets/icons/star.png';
import remove from '../../assets/icons/delete.png';
import edit from '../../assets/icons/edit.png';
import { deletePlaceReviewData } from '../../redux/country-page-reducer';

type ItemProps = {
  user: string
  rating: number
  comment: string
  editReview(id: number): void
  id: string
  index: number
};

type MapStateToPropsType = {
  token: string,
  loggedUser: any,
};

type MapDispatchToPropsType = {
  deletePlaceReviewData: (data: any, token: string) => Promise<void>,
};

type PropsType = ItemProps & MapStateToPropsType & MapDispatchToPropsType;

const ReviewItem:React.FC<PropsType> = ({
  user, rating, comment, id, token, deletePlaceReviewData, loggedUser, editReview, index,
}:PropsType) => (
  <div className="review-item">
    <div className="user-rating">
      <span>{user}</span>
      <span>
        {Math.round(rating)}
        <img className="rating-img" src={star} alt="rating" />
      </span>
      {loggedUser === user ? (
        <div className="buttons">
          <button onClick={() => deletePlaceReviewData(id, token)} type="button" className="remove-review">
            <img src={remove} alt="remove" />
          </button>
          <button onClick={() => editReview(index)} type="button" className="edit-review">
            <img src={edit} alt="edit" />
          </button>
        </div>
      ) : ''}
    </div>
    <div>
      <span className="review-text">{comment}</span>
    </div>
  </div>
);

const mapStateToProps = (state: AppStateType) => ({
  token: state.userState.token,
  loggedUser: state.userState.user?.login,
});

export default connect(mapStateToProps, { deletePlaceReviewData })(ReviewItem);
