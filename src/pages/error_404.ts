import Block, { BlockProps } from '../framework/Block.js';
import Link from '../components/Link';
import { goToPath } from '../helpers/goToPath';

export class Error404 extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      Link: new Link({ href: '#', text: 'Назад к чатам', class: 'link', onClick: () => goToPath('/messenger') }),
    });
  }

  override render() {
    return `<div class="page">
      <main>
        <h1>404</h1>
        <p>Не туда попали</p>
       {{{ Link }}}
      </main>
    </div>`;
  }
}
