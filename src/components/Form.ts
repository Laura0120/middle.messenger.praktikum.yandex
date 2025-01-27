import Block from '../framework/Block';
import Button from './Button';
import InputBlock from './InputBlock';

export interface IFormProps {
  Inputs: InputBlock[];
  Button?: Button;
  onSubmit?: () => void;
}
export default class Form extends Block {
  constructor(props: IFormProps) {
    super({
      ...props,
      events: {
        submit: (e: Event) => {
          const form = this.getContent() as HTMLFormElement;
          form.checkValidity();
          e.preventDefault();
          if (props.onSubmit) {
            props.onSubmit();
          }
        },
      },
    });
  }

  override render(): string {
    return `<form class="form_wrapper" novalidate>
        {{{ Inputs }}}
        {{{ Button }}}
      </form>
      `;
  }
}
