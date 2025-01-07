import './helpers/handlebarsHelpers';
import PAGE_NAMES from './pageNames';
import { EditeProfile, Login, Profile, Registration, ChangePassword, ChatPage, Error404, Error500 } from './pages';
import Navigation from './components/Navigation';

interface AppState {
  currentPage: string;
}

const PageConstructors = {
  [PAGE_NAMES.login.name]: Login,
  [PAGE_NAMES.registration.name]: Registration,
  [PAGE_NAMES.profile.name]: Profile,
  [PAGE_NAMES.editeProfile.name]: EditeProfile,
  [PAGE_NAMES.changePassword.name]: ChangePassword,
  [PAGE_NAMES.chatList.name]: ChatPage,
  [PAGE_NAMES.error_404.name]: Error404,
  [PAGE_NAMES.error_500.name]: Error500,
};
export default class App {
  private state: AppState;

  private appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: PAGE_NAMES.login.name,
    };
    this.appElement = document.getElementById('app');
  }

  getPage({ navigation }) {
    const CurrentPageConstructor = PageConstructors[this.state.currentPage];

    if (!CurrentPageConstructor) {
      throw new Error('Unknown page');
    }

    return new CurrentPageConstructor({ Navigation: navigation });
  }

  render(): void {
    const navigation = new Navigation({
      onClick: (e) => {
        this.changePage((e.target as HTMLElement).dataset.page);
      },
    });

    const page = this.getPage({ navigation });

    const [pageElement] = document.querySelectorAll('#app');

    if (!pageElement) {
      throw new Error('Page is broken');
    }
    pageElement.replaceWith(page.getContent());
  }

  changePage(page) {
    this.state.currentPage = page;
    this.render();
  }
}
