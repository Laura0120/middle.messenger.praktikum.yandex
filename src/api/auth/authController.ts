import auth from './auth';
import store from '../../store/store';
import { goToPath } from '../../helpers/goToPath';
import ChatsController from '../chats/chatsController';

class AuthController {
  signUp(data: Record<string, string>) {
    return auth
      .signUp(data)
      .then(() => this.getUser())
      .catch((error) => console.error('Ошибка регистрации пользователя', error));
  }

  signIn(data: Record<string, string>) {
    return auth
      .signIn(data)
      .then(() => this.getUser())
      .then(() => goToPath('/messenger'))
      .catch((error) => {
        if (error.reason === 'User already in system') {
          return this.getUser().then(() => goToPath('/messenger'));
        }
      });
  }

  logout() {
    return auth
      .logout()
      .then(() => {
        store.set('user', {});
        store.set('chats', []);
        store.set('selectedChat', {});
        // store.set('selectedChatMessages', []);
        goToPath('/');
      })
      .catch((error) => console.error('Ошибка выхода пользователя', error))
      .finally(() => {
        localStorage.removeItem('user');
      });
  }

  getUser() {
    return auth
      .getUser()
      .then((user) => {
        store.set('user', user);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .then(() => ChatsController.getChats({}));
  }
}

export default new AuthController();
