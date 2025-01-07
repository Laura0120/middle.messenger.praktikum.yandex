import Block from '../framework/Block';

export interface ILink {
  onClick?: (e: Event) => void;
  href?: string;
  class?: string;
  dataPage?: string;
  text?: string;
}
export default class Link extends Block {
  constructor(props: ILink) {
    super({
      ...props,
      events: {
        click: (e) => {
          e.preventDefault();
          if (props.onClick) {
            props.onClick(e);
          }
        },
      },
    });
  }

  override render() {
    return '<a href="{{href}}" class="{{class}}" data-page="{{dataPage}}">{{text}}</a>';
  }
}
