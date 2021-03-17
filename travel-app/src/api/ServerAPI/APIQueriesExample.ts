import * as CountriesAPI from './Countries';
import * as PlacesAPI from './Places';
import * as ReviewsAPI from './Reviews';
import { authorizeViaLogin } from './Users';
import {
  Review, UpdateReview, LoginCredentials, AuthorizationResult,
} from './Types';

function logQueryResult(message: string, res:any) {
  console.log(message, ':\n', res);
}

export default function runQueries() {
  CountriesAPI.getAllCountries().then((res) => logQueryResult('getAllCountries()', res));
  CountriesAPI.getCountryByNameOrCapital('Italy').then((res) => logQueryResult('getCountryByNameOrCapital("Italy")', res));

  PlacesAPI.getAllPlacess().then((res) => logQueryResult('getAllPlacess()', res));
  PlacesAPI.getPlaceByName('Колизей').then((res) => logQueryResult('getPlaceByName("Колизей")', res));
  PlacesAPI.getallbycountry('IT').then((res) => logQueryResult('getallbycountry("IT")', res));

  const testUserCredintials: LoginCredentials = {
    login: 'test2',
    password: 'testpassword2',
  };

  authorizeViaLogin(testUserCredintials).then((authorizationResult: AuthorizationResult) => {
    logQueryResult('authorizeViaLogin()', authorizationResult);
    const newReview:Review = {
      placeId: '604d396dbedd6044c481b2d6',
      userLogin: authorizationResult.user?.login || '',
      rating: 6,
      reviewText: `пример отзыва# ${Math.random() * 100}`,
    };
    const token = authorizationResult.token || '2f5823fd9cb459b75afc6508046fad76';

    ReviewsAPI.insertReview(newReview, token).then((res) => logQueryResult('insertReview(newReview, token)', res));
    ReviewsAPI.getAllReviewsByPlaceId('604d396dbedd6044c481b2d6').then((res) => logQueryResult('getAllReviewsByPlaceId()', res));
    // первым параметромнадо указа ть_id удаляемого review. В примере отзыв по id уже удален
    ReviewsAPI.deleteReviewById('604d3d93406b8f1fb88fb9ca', token).then((res) => logQueryResult('deleteReviewById("604d3d93406b8f1fb88fb9ca", token)', res));

    const reviewUpdateOptions: UpdateReview = {
      reviewId: '604e61239dbcdb49fcc5681b',
      updateFields: {
        rating: Math.random() * 10,
        reviewText: `пример измененного отзыва# ${Math.random() * 100}`,
      },
      token,
    };

    ReviewsAPI.updateReviewById(reviewUpdateOptions).then((res) => logQueryResult('updateReviewById(reviewUpdateOptions)', res));
  });
}
