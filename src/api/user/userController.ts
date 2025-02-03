import { IChangePasswordRes, IChangeUserReq, ISearchUserReq, ISearchUserRes } from './type';
import user from './user';
import store from '../../store/store';

class UserController {
  searchUser(data: ISearchUserReq) {
    return user
      .searchUser(data)
      .then((users) => users as ISearchUserRes[])
      .catch((error) => {
        console.error('Ошибка поиска пользователя', error);
        return [];
      });
  }

  changeUser(data: IChangeUserReq) {
    return user.changeUser(data).catch((error) => {
      console.error('Ошибка редактирования профиля', error);
    });
  }

  changeAvatar(data: FormData) {
    return user
      .changeAvatar(data)
      .then((user) => {
        store.set('user', user);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch((error) => {
        console.error('Ошибка изменения аватара', error);
      });
  }

  changePassword(data: IChangePasswordRes) {
    return user.changePassword(data).catch((error) => {
      console.error('Ошибка изменения пароля', error);
    });
  }
}

export const userController = new UserController();
