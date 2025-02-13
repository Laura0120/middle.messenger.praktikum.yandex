import { Router } from './Router';
import Block from './Block';
import { assert } from 'chai';

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    router = new Router('root');
    class DefaultPageStub extends Block {}
    class SignInPageStub extends Block {}
    class MessengerPageStub extends Block {}

    router.use('/', DefaultPageStub).use('/sign-in', SignInPageStub).use('/messenger', MessengerPageStub);
  });

  it('should go through the pages and change the history value', () => {
    router.go('/sign-in');
    router.go('/');
    router.go('/messenger');

    assert.equal(window.history.length, 4);
  });

  it('should go to the selected page ', () => {
    router.go('/messenger');
    assert.equal(window.location.pathname, '/messenger');
  });
});
