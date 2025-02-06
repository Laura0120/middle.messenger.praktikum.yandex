import Button from './Button';
import Input from './Input';
import Block, { BlockProps } from '../framework/Block';
import userController from '../api/user/userController';
import Form from './Form';

class AvatarModal extends Block {
  constructor(props?: BlockProps) {
    super({
      ...props,
      Form: new Form({
        Inputs: [
          new Input({
            name: 'avatar',
            type: 'file',
            required: true,
            attr: { accept: '.jpg, .jpeg, .png' },
          }),
        ],
        Button: new Button({
          type: 'submit',
          text: 'Поменить',
          class: 'button',
          onClick: () => this.handleAdd(),
        }),
      }),

      events: {
        ...props?.props?.events,
        click: (e: Event) => this.handleClick(e),
      },
    });
  }

  handleAdd() {
    const inputElement = this.element?.querySelector('input[type="file"]');
    // @ts-expect-error получаю добавленный файл
    const file = inputElement?.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    userController.changeAvatar(formData).then(() => this.hide());
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
          <h2>Загрузите файл</h2>
          {{{ Form }}}
        </div>
      </div>
    `;
  }
}

export default AvatarModal;
