import Block from '../framework/Block';
import Button from '../components/Button';
import { formValidate, getFormData, TFormState } from '../helpers/formValidation';
import Form from '../components/Form';
import InputBlock from '../components/InputBlock';
import Label from '../components/Label';
import Input from '../components/Input';
import ErrorMessage from '../components/InputErrorMessage';
import Navigation from '../components/Navigation';
import { editeProfileFormInputs } from '../const/editeProfileForm';

interface IEditeProfileProps {
  Navigation: Navigation;
}
export class EditeProfile extends Block {
  protected state: TFormState;

  constructor(props: IEditeProfileProps) {
    super({
      ...props,
      Form: new Form({
        Inputs: Object.values(editeProfileFormInputs).map(
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
    this.state = Object.keys(editeProfileFormInputs).reduce<TFormState>((state, inputName) => {
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
          <h1>Редактирование профиля</h1>
          {{{ Form }}}
        </main>
      </div>`;
  }
}
