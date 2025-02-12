import Button from './Button';
import Block, { BlockProps } from '../framework/Block';
import ChatsController from '../api/chats/chatsController';
import { withSelectedChats } from '../store/utils';
import AddUserModal from './AddUserModal';

import render from '../helpers/render';
import DeleteUserModal from './DeleteUserModal';
class Menu extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      AddUserButton: new Button({
        type: 'button',
        text: "<img src='svg/add.svg' alt='add'><span>Добавить пользователя</span>",
        onClick: () => this.handleAddUser(),
        class: 'add-user',
      }),
      RemoveUserButton: new Button({
        type: 'button',
        text: "<img src='svg/delete.svg' alt='delete'><span>Удалить пользователя</span>",
        onClick: () => this.handleRemoveUser(),
        class: 'remove-user',
      }),
      RemoveChatButton: new Button({
        type: 'button',
        text: "<img src='svg/basket.svg' alt='delete'><span>Удалить<br> чат</span>",
        onClick: () => this.handleRemoveChat(),
        class: 'remove-chat',
      }),
    });
  }

  handleAddUser() {
    render('add-user-modal', new AddUserModal({}));
  }

  handleRemoveUser() {
    render('delete-user-modal', new DeleteUserModal({}));
  }

  handleRemoveChat() {
    const data = { chatId: this.props.selectedChat.id };
    ChatsController.deleteChat(data);
  }

  override render(): string {
    return `
        <div class='user-menu'>
          {{{ AddUserButton }}}
          {{{ RemoveUserButton }}}
          {{{ RemoveChatButton }}}
        </div>
    `;
  }
}

export default withSelectedChats(Menu);
