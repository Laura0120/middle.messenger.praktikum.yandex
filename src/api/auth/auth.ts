import { ISignInReq, ISignUpReq } from './type';
import { HTTPTransport } from '../apiService';

const authAPIInstance = new HTTPTransport('/api/v2/auth');

function signUp(data: ISignUpReq) {
  return authAPIInstance.post('/signup', { data });
}

function signIn(data: ISignInReq) {
  return authAPIInstance.post('/signin', { data });
}

function logout() {
  return authAPIInstance.post('/logout');
}

function getUser() {
  return authAPIInstance.get('/user');
}

export default { signUp, signIn, logout, getUser };
