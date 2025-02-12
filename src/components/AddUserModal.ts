import Button from './Button';
import Input from './Input';
import Block, { BlockProps } from '../framework/Block';
import Form from './Form';
import { formValidate, TFormState, toFormData } from '../helpers/formValidation';
import InputBlock from './InputBlock';
import Label from './Label';
import ErrorMessage from './InputErrorMessage';
import { loginPattern } from '../const/patterns';
import chatsController from '../api/chats/chatsController';
import UserController from '../api/user/userController';
import { withSelectedChats } from '../store/utils';

class AddUserModal extends Block {
  protected state: TFormState;

  constructor(props?: BlockProps) {
    const name = 'login';
    const placeholder = 'Логин';
    const errorMessage = 'Недопустимое значение';
    const ariaErrorMessage = 'title-errors';
    const pattern = loginPattern;

    super({
      ...props,
      Form: new Form({
        Inputs: [
          new InputBlock({
            Label: new Label({ name, label: placeholder }),
            Input: new Input({
              name,
              type: 'text',
              placeholder,
              errorMessage,
              pattern,
              setInputValid: (valid) => {
                this.state[name].valid = valid;
              },
              setInputValue: (value) => {
                this.state[name].value = value;
              },
              required: true,
            }),
            ErrorMessage: new ErrorMessage({
              errorMessage: errorMessage,
              ariaErrorMessage: ariaErrorMessage,
            }),
          }),
        ],
        Button: new Button({
          type: 'submit',
          text: 'Добавить',
          class: 'button',
        }),

        onSubmit: () => {
          if (!formValidate(this.state)) {
            return;
          }
          this.handlerAddUser();
        },
      }),

      events: {
        ...props?.props?.events,
        click: (e: Event) => this.handleClick(e),
      },
    });

    this.state = { login: { value: '', valid: true } };
  }

  handlerAddUser(): void {
    UserController.searchUser(toFormData(this.state))
      .then((users) => {
        if (users.length > 0) {
          const data = {
            users: [users[0].id],
            chatId: this.props.selectedChat.id as number,
          };
          chatsController.addUserToChat(data);
        }
      })
      .then(() => this.hide());
  }

  handleClick(e: Event) {
    const target = e.target as HTMLElement;

    if (target.classList.contains('modal-backdrop')) {
      this.hide();
    } else if (target.closest('.close-btn')) {
      this.hide();
    }
  }

  override render(): string {
    return `
      <div class="modal-backdrop">
        <div class="modal-content">
          <h2>Добавить пользователя</h2>
          {{{ Form }}}
        </div>
      </div>
    `;
  }
}
export default withSelectedChats(AddUserModal);
