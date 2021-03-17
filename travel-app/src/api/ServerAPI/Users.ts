import { SERVER_PATH, USERS_PATH } from './Const';
import { LoginCredentials, AuthorizationResult } from './Types';

async function authorizeViaLogin(LoginCredentials: LoginCredentials): Promise<AuthorizationResult> {
  const requestOptions = {
    method: 'PUT',
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
export { authorizeViaLogin, registration };
