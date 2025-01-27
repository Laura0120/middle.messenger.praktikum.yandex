import Block from '../framework/Block';
export interface ILabelProps {
  name: string;
  label: string;
}
export default class Label extends Block {
  constructor(props: ILabelProps) {
    super(props);
  }

  override render() {
    return '<label for="{{name}}" class="label">{{ label }}</label>>';
  }
}
