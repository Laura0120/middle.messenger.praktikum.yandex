import Block from '../framework/Block';
import Button from '../components/Button';
import { formValidate, getFormData, TFormState } from '../helpers/formValidation';
import Form from '../components/Form';
import Navigation from '../components/Navigation';
import InputBlock from '../components/InputBlock';
import Label from '../components/Label';
import ErrorMessage from '../components/InputErrorMessage';
import Input from '../components/Input';
import Link from '../components/Link';
import { registrationFormInputs } from '../const/registrationForm';

interface IRegistrationProps {
  Navigation: Navigation;
  Link: Link;
  Form: Form;
}
export class Registration extends Block {
  protected state: TFormState;

  constructor(props: IRegistrationProps) {
    super({
      ...props,
      Form: new Form({
        Inputs: Object.values(registrationFormInputs).map(
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
          text: 'Зарегистрироваться',
          class: 'button',
        }),
        onSubmit: () => {
          if (!formValidate(this.state)) {
            return;
          }
          console.log(getFormData(this.state));
        },
      }),
      Link: new Link({ href: '#', text: 'Войти', class: 'link' }),
    });
    this.state = Object.keys(registrationFormInputs).reduce<TFormState>((state, inputName) => {
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
          <h1 class="form_title">Регистрация</h1>
          {{{ Form }}}
          {{{ LinkLoginIn }}}
        </main>
      </div>`;
  }
}
