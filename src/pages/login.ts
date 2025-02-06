import Block, { BlockProps } from '../framework/Block';
import Button from '../components/Button';
import { formValidate, TFormState, toFormData } from '../helpers/formValidation';
import Form from '../components/Form';
import InputBlock from '../components/InputBlock';
import Label from '../components/Label';
import ErrorMessage from '../components/InputErrorMessage';
import Input from '../components/Input';
import Link from '../components/Link';
import { loginFormInputs } from '../const/loginForm';
import { goToPath } from '../helpers/goToPath';
import authController from '../api/auth/authController';
import { withUser } from '../store/utils';

class Login extends Block {
  protected state: TFormState;

  constructor(props: BlockProps) {
    super({
      ...props,
      Form: new Form({
        Inputs: Object.values(loginFormInputs).map(
          ({ name, type, placeholder, errorMessage, ariaErrorMessage, pattern, required }) =>
            new InputBlock({
              Label: new Label({ name, label: placeholder ?? '' }),
              Input: new Input({
                name,
                type,
                placeholder,
                errorMessage,
                setInputValid: (valid) => {
                  this.state[name].valid = valid;
                },
                setInputValue: (value) => {
                  this.state[name].value = value;
                },
                pattern,
                required,
              }),
              ErrorMessage: new ErrorMessage({
                errorMessage: errorMessage ?? '',
                ariaErrorMessage: ariaErrorMessage ?? '',
              }),
            }),
        ),
        Button: new Button({
          type: 'submit',
          text: 'Авторизоваться',
          class: 'button',
        }),
        onSubmit: () => {
          if (!formValidate(this.state)) {
            return;
          }
          authController.signIn(toFormData(this.state));
        },
      }),
      Link: new Link({
        text: 'Нет аккаунта?',
        class: 'link',
        onClick: (event: Event) => {
          goToPath('/sign-up', event);
        },
      }),
    });

    this.state = Object.keys(loginFormInputs).reduce<TFormState>((state, inputName) => {
      state[inputName] = { value: '', valid: true };
      return state;
    }, {});
  }

  override render(): string {
    return `<div class="page">
        <main class="form_block">
          <h1 class="form_title">Вход</h1>
          {{{ Form }}}
          {{{ Link }}}
        <main/>
      </div>`;
  }
}
export default withUser(Login);
