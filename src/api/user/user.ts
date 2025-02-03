import { IChangePasswordRes, IChangeUserReq, ISearchUserReq } from './type';
import { HTTPTransport } from '../apiService';

const userAPIInstance = new HTTPTransport('/api/v2/user');

function searchUser(data: ISearchUserReq) {
  return userAPIInstance.post('/search', { data });
}

function changeUser(data: IChangeUserReq) {
  return userAPIInstance.put('/profile', { data });
}

function changeAvatar(data: FormData) {
  return userAPIInstance.put('/profile/avatar', { data });
}

function changePassword(data: IChangePasswordRes) {
  return userAPIInstance.put('/password', { data });
}

export default { searchUser, changeUser, changeAvatar, changePassword };
