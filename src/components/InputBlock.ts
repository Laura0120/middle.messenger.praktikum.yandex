import Block from '../framework/Block';
import Label from './Label';
import ErrorMessage from './InputErrorMessage';
import Input from './Input';

export interface IInputBlockProps {
  Input: Input;
  Label?: Label;
  ErrorMessage?: ErrorMessage;
}

export default class InputBlock extends Block {
  constructor(props: IInputBlockProps) {
    super(props);
  }

  override render() {
    return '<div class="input_wrapper">{{{ Input }}} {{{ Label }}} {{{ ErrorMessage }}}</div>';
  }
}
