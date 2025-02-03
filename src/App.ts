import { Router } from './framework/Router';
import Login from './pages/login';
import { Registration } from './pages/registration';
import Profile from './pages/profile';
import EditeProfile from './pages/editeProfile';
import ChangePassword from './pages/changePassword';
import { ChatPage } from './pages/chatPage';
import { Error404 } from './pages/error_404';
import { Error500 } from './pages/error_500';

export default class App {
  constructor() {
    const router = new Router('app');
    router
      .use('/', Login)
      .use('/sign-up', Registration)
      .use('/settings', Profile)
      .use('/settings-edite', EditeProfile)
      .use('/settings-changePassword', ChangePassword)
      .use('/messenger', ChatPage)
      .use('/404', Error404)
      .use('/500', Error500)
      .start();
  }
}
