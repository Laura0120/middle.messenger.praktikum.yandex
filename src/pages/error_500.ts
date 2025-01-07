import Block from '../framework/Block.js';
import Link from '../components/Link';
import Navigation from '../components/Navigation';

interface IError500Props {
  Navigation: Navigation;
  Link: Link;
}

export class Error500 extends Block {
  constructor(props: IError500Props) {
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
          <h1>500</h1>
          <p>Мы уже фиксим</p>
          {{{ Link }}}
        </main>
      </div>`;
  }
}
