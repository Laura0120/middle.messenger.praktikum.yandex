import { ISearchUserRes } from './type';
import user from './user';
import store from '../../store/store';
import { goToPath } from '../../helpers/goToPath';
import authController from '../auth/authController';

class UserController {
  searchUser(data: Record<string, string>) {
    return user
      .searchUser(data)
      .then((users) => users as ISearchUserRes[])
      .catch((error) => {
        console.error('Ошибка поиска пользователя', error);
        return [];
      });
  }

  changeUser(data: Record<string, string>) {
    return user
      .changeUser(data)
      .then((data) => {
        store.set('user', data);
        localStorage.setItem('user', JSON.stringify(data));
      })
      .then(() => goToPath('/profile'))
      .catch((error) => console.error('Ошибка редактирования профиля', error));
  }

  changeAvatar(data: FormData) {
    return user
      .changeAvatar(data)
      .then(() => authController.getUser())
      .catch((error) => console.error('Ошибка изменения аватара', error));
  }

  changePassword(data: Record<string, string>) {
    return user
      .changePassword(data)
      .then(() => goToPath('/profile'))
      .catch((error) => console.error('Ошибка изменения пароля', error));
  }
}

export default new UserController();
