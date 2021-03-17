import { SERVER_PATH, USERS_PATH } from './Const';
import { LoginCredentials, AuthorizationResult } from './Types';

async function authorizeViaLogin(LoginCredentials: LoginCredentials): Promise<AuthorizationResult> {
  const requestOptions = {
    method: 'PUT',
    mode: 'cors' as RequestMode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(LoginCredentials),
  };
  const response: Response = await fetch(`${SERVER_PATH}${USERS_PATH}/authorization`, requestOptions);
  const result: AuthorizationResult = await response.json();
  return result;
}

async function registration(userData: FormData): Promise<AuthorizationResult> {
  const requestOptions = {
    method: 'POST',
    mode: 'cors' as RequestMode,
    headers: {
      uploadPreset: 'avatar',
    },
    body: userData,
  };
  const response: Response = await fetch(`${SERVER_PATH}${USERS_PATH}/register`, requestOptions);
  const result: AuthorizationResult = await response.json();
  return result;
}

async function checkSession(token: string): Promise<AuthorizationResult> {
  const requestOptions = {
    method: 'PUT',
    mode: 'cors' as RequestMode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  };
  const response: Response = await fetch(`${SERVER_PATH}${USERS_PATH}/checksession`, requestOptions);
  const result: AuthorizationResult = await response.json();
  return result;
}

async function logOut(login: string) {
  const requestOptions = {
    method: 'DELETE',
    mode: 'cors' as RequestMode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login }),
  };
  const response: Response = await fetch(`${SERVER_PATH}${USERS_PATH}/logout`, requestOptions);
  const result: AuthorizationResult = await response.json();
  return result;
}
export {
  authorizeViaLogin, registration, checkSession, logOut,
};
