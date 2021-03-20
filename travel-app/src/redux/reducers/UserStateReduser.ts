import { Dispatch } from 'redux';
import { UserPublicData, AuthorizationResult, LoginCredentials } from '../../api/ServerAPI/Types';
import {
  registration, checkSession, authorizeViaLogin, logOut,
} from '../../api/ServerAPI/Users';

type UserState = {
  user: UserPublicData | null;
  isLoged: boolean;
  token: string;
  queryStatus: {
    isPending: boolean;
    isSuccessful: boolean;
  }
};

enum UserStateActionTypes {
  SETPENDINGSTATUS = 'SETPENDINGSTATUS',
  SETUSERSTATE = 'SETUSERSTATE',
  CLEARUSERSTATE = 'CLEARUSERSTATE',
}

type SetPendingStatus = {
  type: UserStateActionTypes.SETPENDINGSTATUS;
  payload: {
    isPending: boolean;
    isSuccessful: boolean;
  }
};

type SeetUserStateAction = {
  type: UserStateActionTypes.SETUSERSTATE;
  payload: UserState;
};

type ClearUserStateAction = {
  type: UserStateActionTypes.CLEARUSERSTATE;
};

type UserStateActions = SetPendingStatus | SeetUserStateAction | ClearUserStateAction;

const initialState: UserState = {
  user: null,
  isLoged: false,
  token: '',
  queryStatus: {
    isPending: false,
    isSuccessful: true,
  },
};

function UserStateReduser(state = initialState, action: UserStateActions): UserState {
  switch (action.type) {
    case UserStateActionTypes.SETPENDINGSTATUS:
      return { ...initialState, queryStatus: { ...action.payload } };
    case UserStateActionTypes.CLEARUSERSTATE:
      return { ...initialState };
    case UserStateActionTypes.SETUSERSTATE:
      return { ...action.payload };
    default:
      return state;
  }
}

const setPendingStatusAction = (payload: {
  isPending: boolean;
  isSuccessful: boolean;
}):UserStateActions => (
  {
    type: UserStateActionTypes.SETPENDINGSTATUS,
    payload,
  });

const setUserStateAction = (payload: UserState): UserStateActions => (
  {
    type: UserStateActionTypes.SETUSERSTATE,
    payload,
  });

const clearUserStateAction = (): UserStateActions => ({
  type: UserStateActionTypes.CLEARUSERSTATE,
});

function userRegistration(registrationData: FormData) {
  return async (dispatch: Dispatch<UserStateActions>):Promise<void> => {
    dispatch(setPendingStatusAction({
      isPending: true,
      isSuccessful: true,
    }));
    const {
      authorizationStatus,
      token,
      user,
    }:AuthorizationResult = await registration(registrationData);
    if (authorizationStatus) {
      dispatch(setUserStateAction({
        user,
        token,
        isLoged: authorizationStatus,
        queryStatus: { isPending: false, isSuccessful: true },
      }));
      localStorage.setItem('token', token);
    } else {
      dispatch(setPendingStatusAction({
        isPending: false,
        isSuccessful: false,
      }));
    }
  };
}

function userLogin(LoginCredentialsForm: FormData) {
  return async (dispatch: Dispatch<UserStateActions>):Promise<void> => {
    dispatch(setPendingStatusAction({
      isPending: true,
      isSuccessful: true,
    }));
    const loginCredentials: LoginCredentials = {
      login: LoginCredentialsForm.get('login') as string || '',
      password: LoginCredentialsForm.get('password') as string || '',
    };
    const {
      authorizationStatus,
      token,
      user,
    }:AuthorizationResult = await authorizeViaLogin(loginCredentials);
    if (authorizationStatus) {
      dispatch(setUserStateAction({
        user,
        token,
        isLoged: authorizationStatus,
        queryStatus: { isPending: false, isSuccessful: true },
      }));
      localStorage.setItem('token', token);
    } else {
      dispatch(setPendingStatusAction({
        isPending: false,
        isSuccessful: false,
      }));
    }
  };
}

function userCheckSession() {
  return async (dispatch: Dispatch<UserStateActions>):Promise<void> => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      dispatch(setPendingStatusAction({
        isPending: true,
        isSuccessful: true,
      }));
      const {
        authorizationStatus,
        token,
        user,
      }:AuthorizationResult = await checkSession(localToken);
      if (authorizationStatus) {
        dispatch(setUserStateAction({
          user,
          token,
          isLoged: authorizationStatus,
          queryStatus: { isPending: false, isSuccessful: true },
        }));
        localStorage.setItem('token', token);
      } else {
        dispatch(setPendingStatusAction({
          isPending: false,
          isSuccessful: false,
        }));
        localStorage.setItem('token', '');
      }
    }
  };
}

function userLogOut(login: string) {
  return async (dispatch: Dispatch<UserStateActions>) => {
    dispatch(setPendingStatusAction({
      isPending: true,
      isSuccessful: true,
    }));
    const {
      authorizationStatus,
      token,
      user,
    }:AuthorizationResult = await logOut(login);
    if (!authorizationStatus) {
      dispatch(setUserStateAction({
        user,
        token,
        isLoged: authorizationStatus,
        queryStatus: { isPending: false, isSuccessful: true },
      }));
      localStorage.setItem('token', '');
    } else {
      dispatch(setPendingStatusAction({
        isPending: false,
        isSuccessful: false,
      }));
    }
  };
}

export {
  UserStateReduser,
  UserStateActionTypes,
  setUserStateAction,
  clearUserStateAction,
  userRegistration,
  userCheckSession,
  userLogin,
  userLogOut,
};
