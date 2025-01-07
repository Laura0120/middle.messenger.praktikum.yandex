import Block from '../framework/Block';
export interface IButtonProps {
  type: 'submit' | 'button';
  class?: string;
  text?: string;
  onClick?: () => void;
}
export default class Button extends Block {
  constructor(props: IButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  override render() {
    return '<button type="{{type}}" class="{{class}}">{{text}}<button/>';
  }
}
