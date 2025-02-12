import { Route } from './Route';
import { BlockProps, BlockClass } from './Block';
import { ISearchUserRes } from '../api/user/type';

export class Router {
  static __instance: Router;

  protected routes: Array<Route>;

  protected history: History | null;

  protected _currentRoute: Route | null;

  protected _rootQuery: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: BlockClass) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: Event) => {
      const target = event.target as Window;
      this._onRoute(target.location.pathname);
    };

    const user: ISearchUserRes | null = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') ?? '')
      : null;

    if (!user || !user.id) {
      this.go('/');
    } else if (user && user.id && window.location.pathname === '/') {
      this.go('/messenger');
    } else {
      this._onRoute(window.location.pathname);
    }
  }

  go(pathname: string, props?: BlockProps) {
    this.history?.pushState({}, '', pathname);
    this._onRoute(pathname, props);
  }

  _onRoute(pathname: string, props?: BlockProps) {
    const route = this.getRoute(pathname);
    if (!route) {
      if (this.getRoute('/404')) {
        this._onRoute('/404');
      }

      return;
    }

    route.render(props);
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
