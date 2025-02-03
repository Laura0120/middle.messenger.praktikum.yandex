import { ISignInReq, ISignUpReq } from './type';
import auth from './auth';
import store from '../../store/store';
import { goToPath } from '../../helpers/goToPath';

class AuthController {
  signUp(data: ISignUpReq) {
    return auth
      .signUp(data)
      .then(() => {
        auth.getUser().then((user) => {
          store.set('user', user);
          localStorage.setItem('user', JSON.stringify(user));
        });
      })
      .catch((error) => {
        console.error('Ошибка регистрации пользователя', error);
      });
  }

  signIn(data: ISignInReq) {
    return auth
      .signIn(data)
      .then(() => {
        auth.getUser();
      })
      .then(() => {
        goToPath('/messenger');
      })
      .catch((error) => {
        if (error.reason === 'User already in system') {
          this.getUser().then(() => {
            goToPath('/messenger');
          });
        }
      });
  }

  logout() {
    return auth
      .logout()
      .then(() => {
        store.set('user', {});
        goToPath('/');
      })
      .catch((error) => {
        console.error('Ошибка выхода пользователя', error);
      })
      .finally(() => {
        localStorage.removeItem('user');
      });
  }

  getUser() {
    return auth.getUser().then((user) => {
      store.set('user', user);
      localStorage.setItem('user', JSON.stringify(user));
    });
  }
}

export const authController = new AuthController();
