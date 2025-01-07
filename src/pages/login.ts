import Block from '../framework/Block';
import Button from '../components/Button';
import { formValidate, getFormData, TFormState } from '../helpers/formValidation';
import Form from '../components/Form';
import InputBlock from '../components/InputBlock';
import Label from '../components/Label';
import ErrorMessage from '../components/InputErrorMessage';
import Input from '../components/Input';
import Link from '../components/Link';
import Navigation from '../components/Navigation';
import { loginFormInputs } from '../const/loginForm';

interface ILoginProps {
  Navigation: Navigation;
  Link: Link;
  Form: Form;
}
export class Login extends Block {
  protected state: TFormState;

  constructor(props: ILoginProps) {
    super({
      ...props,
      Form: new Form({
        Inputs: Object.values(loginFormInputs).map(
          ({ name, type, placeholder, errorMessage, ariaErrorMessage, pattern, required }) =>
            new InputBlock({
              Label: new Label({ name, label: placeholder }),
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
                errorMessage,
                ariaErrorMessage,
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
          console.log(getFormData(this.state));
        },
      }),
      Link: new Link({ href: '#', text: 'Нет аккаунта?', class: 'link' }),
    });

    this.state = Object.keys(loginFormInputs).reduce<TFormState>((state, inputName) => {
      state[inputName] = { value: '', valid: true };
      return state;
    }, {});
  }

  override render(): string {
    return `<div class="page" id="app">
        <header>
          {{{ Navigation }}}
        </header>
        <main class="form_block">
          <h1 class="form_title">Вход</h1>
          {{{ Form }}}
          {{{ Link }}}
        <main/>
      </div>`;
  }
}
