import Block from '../framework/Block';
export interface IErrorMessageProps {
  ariaErrorMessage: string;
  errorMessage: string;
}
export default class ErrorMessage extends Block {
  constructor(props: IErrorMessageProps) {
    super(props);
  }

  override render() {
    return '<span class="input_error" id="{{ariaErrorMessage}}">{{errorMessage}}</span>';
  }
}
