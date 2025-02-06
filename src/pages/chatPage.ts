import Block, { BlockProps } from '../framework/Block';
import Input from '../components/Input';
import Link from '../components/Link';
import ChatFeed from '../components/ChatFeed';
import { goToPath } from '../helpers/goToPath';
import Button from '../components/Button';
import render from '../helpers/render';
import CreateChatModal from '../components/CreateChatModal';
import ChatList from '../components/ChatList';
import chatsController from '../api/chats/chatsController';

class ChatPage extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      Link: new Link({ href: '#', text: 'Профиль', class: 'link', onClick: () => goToPath('/settings') }),
      AddChatButton: new Button({
        type: 'button',
        text: 'Создать чат',
        class: 'button',
        onClick: () => this.openModal(),
      }),
      Input: new Input({ name: 'search', type: 'search', placeholder: 'Поиск' }),
      ChatFeed: new ChatFeed({}),
      ChatList: new ChatList({}),
    });

    chatsController.getChats({});
  }

  openModal() {
    render('create-chat-modal', new CreateChatModal({}));
  }

  override render(): string {
    return `<div class="page">
        <main class="main">
          <h1 class="sr-only">Список чатов</h1>
          <div class="chats_wrapper">
            <div class="chat-list_wrapper">
              {{{ Link }}}
              {{{ AddChatButton }}}
              <form>
                {{{ Input }}}
              </form>
               {{{ ChatList }}}
            </div>
            {{{ ChatFeed }}}
          </div>
        </main>
         <div  id="create-chat-modal"></div>
         <div  id="add-user-modal"></div>
         <div  id="delete-user-modal"></div>
      </div>`;
  }
}

export default ChatPage;
