type Country = {
  capitalLocation: {
    coordinates: number[];
    type: string;
  };
  imageUrl: string;
  videoUrl: string;
  currency: string;
  ISOCode: string;
  UTCTimezone: number;
  localizations: {
    lang: string;
    capital: string;
    description: string;
    name: string;
  }[];
};

type Place = {
  countryIsoCode: string;
  photoUrl: string;
  localizations: {
    lang: string;
    description: string;
    name: string;
  }[];
};

type Review = {
  placeId: string;
  userLogin: string;
  rating: number;
  reviewText: string;
};

type UpdateReview = {
  reviewId: string;
  updateFields: {
    rating?: number;
    reviewText?: string;
  };
  token: string;
};

type ReviewInsDelResult = {
  authorizationStatus: boolean;
  operationResult: boolean;
};
type DocumentUpdateResult = {
  authorizationStatus: boolean;
  updateStatus: boolean;
  message: string;
};

type LoginCredentials = {
  login: string;
  password: string;
};

type UserRegistrationData = LoginCredentials & {
  email: string;
  name: string;
  imgSecureUrl: string;
  imgPublicId: string;
};

type UserPublicData = {
  login: string;
  email: string;
  name: string;
  imgSecureUrl: string;
  imgPublicId: string;
};

type AuthorizationResult = {
  authorizationStatus: boolean;
  token: string;
  user: UserPublicData | null;
};

export type {
  Country,
  Place,
  Review,
  UpdateReview,
  ReviewInsDelResult,
  DocumentUpdateResult,
  LoginCredentials,
  UserRegistrationData,
  UserPublicData,
  AuthorizationResult,
};
