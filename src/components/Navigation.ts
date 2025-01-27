import Block from '../framework/Block';
import Link from './Link';

import PAGE_NAMES from '../pageNames';
export interface INavigationProps {
  onClick: (e: Event) => void;
}
export default class Navigation extends Block {
  constructor(props: INavigationProps) {
    super({
      PageList: Object.values(PAGE_NAMES).map(
        (item) =>
          new Link({ href: '#', dataPage: item.name, text: item.title, class: 'nav_link', onClick: props.onClick }),
      ),
    });
  }

  override render(): string {
    return `<nav class="nav">
           {{{ PageList }}}
        </nav>`;
  }
}
