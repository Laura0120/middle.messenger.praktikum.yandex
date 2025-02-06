import { HTTPTransport } from '../apiService';

const userAPIInstance = new HTTPTransport('/api/v2/user');

function searchUser(data: Record<string, string>) {
  return userAPIInstance.post('/search', { data });
}

function changeUser(data: Record<string, string>) {
  return userAPIInstance.put('/profile', { data });
}

function changeAvatar(data: FormData) {
  return userAPIInstance.put('/profile/avatar', { data });
}

function changePassword(data: Record<string, string>) {
  return userAPIInstance.put('/password', { data });
}

export default { searchUser, changeUser, changeAvatar, changePassword };
