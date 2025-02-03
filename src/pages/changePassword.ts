import Block, { BlockProps } from '../framework/Block';
import Button from '../components/Button';
import { formValidate, TFormState, toFormData } from '../helpers/formValidation';
import Form from '../components/Form';
import InputBlock from '../components/InputBlock';
import Label from '../components/Label';
import Input from '../components/Input';
import ErrorMessage from '../components/InputErrorMessage';
import { changePasswordForm } from '../const/changePasswordForm';
import { withUser } from '../store/utils';
import { userController } from '../api/user/userController';
import { goToPath } from '../helpers/goToPath';

class ChangePassword extends Block {
  protected state: TFormState;

  constructor(props: BlockProps) {
    super({
      ...props,
      Form: new Form({
        Inputs: Object.values(changePasswordForm).map(
          ({ name, placeholder, type, errorMessage, ariaErrorMessage, pattern, required }) =>
            new InputBlock({
              Label: new Label({ name, label: placeholder ?? '' }),
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
          userController.changePassword(toFormData(this.state)).then(() => {
            goToPath('/settings');
          });
        },
      }),
    });

    this.state = Object.keys(changePasswordForm).reduce<TFormState>((state, inputName) => {
      state[inputName] = { value: '', valid: true };
      return state;
    }, {});
  }

  override render(): string {
    return `<div class="page">
        <main>
          <h1>Смена пароля</h1>
          {{{ Form }}}
        </main>
      </div>`;
  }
}
export default withUser(ChangePassword);
