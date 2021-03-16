import { SERVER_PATH, REVIEWS_PATH } from './Const';
import {
  Review, UpdateReview, ReviewInsDelResult, DocumentUpdateResult,
} from './Types';

async function insertReview(
  newReview: Review,
  token: string,
): Promise<ReviewInsDelResult> {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    body: JSON.stringify(newReview),
  };
  const response = await fetch(`${SERVER_PATH}${REVIEWS_PATH}/add`, requestOptions);
  let result: ReviewInsDelResult = {
    authorizationStatus: false,
    operationResult: false,
  };
  if (response.status === 200) {
    result = await response.json();
  }
  return result;
}

async function getAllReviewsByPlaceId(placeid: string):Promise<Review[]> {
  let arrOfReviews: Review[] = [];
  const response: Response = await fetch(`${SERVER_PATH}${REVIEWS_PATH}/getallbyplaceid/${placeid}`);
  if (response.status === 200) {
    arrOfReviews = await response.json();
  }
  return arrOfReviews;
}

async function deleteReviewById(id: string, token: string):Promise<ReviewInsDelResult> {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      token,
    },
  };
  const response = await fetch(`${SERVER_PATH}${REVIEWS_PATH}/deletebyid/${id}`, requestOptions);
  let result: ReviewInsDelResult = {
    authorizationStatus: false,
    operationResult: false,
  };
  if (response.status === 200) {
    result = await response.json();
  }
  return result;
}

async function updateReviewById({
  reviewId, updateFields, token,
}: UpdateReview): Promise<
  DocumentUpdateResult & { updatedReview: Review | null }
  > {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    body: JSON.stringify(updateFields),
  };
  const response = await fetch(`${SERVER_PATH}${REVIEWS_PATH}/updatebyid/${reviewId}`, requestOptions);
  const result: DocumentUpdateResult & { updatedReview: Review | null } = await response.json();
  return result;
}
export {
  insertReview, getAllReviewsByPlaceId, deleteReviewById, updateReviewById,
};
