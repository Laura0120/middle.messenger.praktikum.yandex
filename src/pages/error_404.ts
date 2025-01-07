import Block from '../framework/Block.js';
import Link from '../components/Link';
import Navigation from '../components/Navigation';

interface IError404Props {
  Navigation: Navigation;
  Link: Link;
}
export class Error404 extends Block {
  constructor(props: IError404Props) {
    super({
      ...props,
      Link: new Link({ href: '#', text: 'Назад к чатам', class: 'link' }),
    });
  }

  override render() {
    return `<div class="page" id="app">
      <header>
        {{{ Navigation }}}
      </header>
      <main>
        <h1>404</h1>
        <p>Не туда попали</p>
       {{{ Link }}}
      </main>
    </div>`;
  }
}
