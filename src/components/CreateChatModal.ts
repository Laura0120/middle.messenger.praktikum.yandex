import Button from './Button';
import Input from './Input';
import Block, { BlockProps } from '../framework/Block';
import Form from './Form';
import { formValidate, TFormState, toFormData } from '../helpers/formValidation';
import InputBlock from './InputBlock';
import Label from './Label';
import ErrorMessage from './InputErrorMessage';
import ChatsController from '../api/chats/chatsController';

class CreateChatModal extends Block {
  protected state: TFormState;

  constructor(props?: BlockProps) {
    const name = 'title';
    const placeholder = 'Имя чата';
    const errorMessage = 'Недопустимое значение';
    const ariaErrorMessage = 'title-errors';

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
          ChatsController.createChat(toFormData(this.state)).then(() => this.hide());
        },
      }),

      events: {
        ...props?.props?.events,
        click: (e: Event) => this.handleClick(e),
      },
    });

    this.state = { title: { value: '', valid: true } };
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
          <h2>Добавить чат</h2>
          {{{ Form }}}
        </div>
      </div>
    `;
  }
}

export default CreateChatModal;
