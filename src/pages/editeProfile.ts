import Block, { BlockProps } from '../framework/Block';
import Button from '../components/Button';
import { formValidate, TFormState, toFormData } from '../helpers/formValidation';
import Form from '../components/Form';
import InputBlock from '../components/InputBlock';
import Label from '../components/Label';
import Input from '../components/Input';
import ErrorMessage from '../components/InputErrorMessage';
import { editeProfileFormInputs } from '../const/editeProfileForm';
import { withUser } from '../store/utils';
import userController from '../api/user/userController';
import { goToPath } from '../helpers/goToPath';

class EditeProfile extends Block {
  protected state: TFormState;

  constructor(props: BlockProps) {
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
          userController.changeUser(toFormData(this.state)).then(() => goToPath('/settings'));
        },
      }),
    });
    this.state = Object.keys(editeProfileFormInputs).reduce<TFormState>((state, inputName) => {
      state[inputName] = { value: '', valid: true };
      return state;
    }, {});
  }

  override render(): string {
    return `<div class="page">
        <main>
          <h1>Редактирование профиля</h1>
          {{{ Form }}}
        </main>
      </div>`;
  }
}
export default withUser(EditeProfile);
