import Block from '../framework/Block';
import Button from '../components/Button';
import { formValidate, getFormData, TFormState } from '../helpers/formValidation';
import Form from '../components/Form';
import InputBlock from '../components/InputBlock';
import Label from '../components/Label';
import Input from '../components/Input';
import ErrorMessage from '../components/InputErrorMessage';
import Navigation from '../components/Navigation';
import { changePasswordForm } from '../const/changePasswordForm';

interface IChangePasswordProps {
  Navigation: Navigation;
  Form: Form;
}
export class ChangePassword extends Block {
  protected state: TFormState;

  constructor(props: IChangePasswordProps) {
    super({
      ...props,
      Form: new Form({
        Inputs: Object.values(changePasswordForm).map(
          ({ name, placeholder, type, errorMessage, ariaErrorMessage, pattern, required }) =>
            new InputBlock({
              Label: new Label({ name, label: placeholder }),
              Input: new Input({
                name,
                type,
                placeholder,
                errorMessage,
                required,
                pattern,
                setInputValid: (valid) => {
                  this.state[name].valid = valid;
                },
                setInputValue: (value) => {
                  this.state[name].value = value;
                },
              }),
              ErrorMessage: new ErrorMessage({
                errorMessage,
                ariaErrorMessage,
              }),
            }),
        ),
        Button: new Button({
          type: 'submit',
          text: 'Сохранить',
          class: 'button',
        }),
        onSubmit: () => {
          if (!formValidate(this.state)) {
            return;
          }
          console.log(getFormData(this.state));
        },
      }),
    });

    this.state = Object.keys(changePasswordForm).reduce<TFormState>((state, inputName) => {
      state[inputName] = { value: '', valid: true };
      return state;
    }, {});
  }

  override render(): string {
    return `<div class="page" id="app">
        <header>
          {{{ Navigation }}}  
        </header>
        <main>
          <h1>Смена пароля</h1>
          {{{ Form }}}
        </main>
      </div>`;
  }
}
