import Block from '../framework/Block';
import Input from '../components/Input';
import Link from '../components/Link';
import ChatItem from '../components/ChatItem';
import ChatFeed from '../components/ChatFeed';

export class ChatPage extends Block {
  constructor(props: any) {
    super({
      ...props,

      Input: new Input({ name: 'search', type: 'search', placeholder: 'Поиск' }),
      Link: new Link({ href: '#', text: 'Профиль', class: 'link' }),
      ChatFeed: new ChatFeed({ contactName: 'Андрей' }),
      ChatItems: [
        new ChatItem({
          contactName: 'Андрей',
          message:
            'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.',
          messageDate: new Date(),
          unreadMessages: 1,
        }),
      ],
    });
  }

  override render(): string {
    return `<div class="page" id="app">
        <header>
            {{{ Navigation }}}
        </header>
        <main class="main">
          <h1 class="sr-only">Список чатов</h1>
          <div class="chats_wrapper">
            <div class="chat-list_wrapper">
              {{{ Link }}}
              <div class="chat-list_header">
                <form>
                  {{{ Input }}}
                </form>
              </div>
               {{{ ChatItems }}}
            </div>
            {{{ ChatFeed }}}
          </div>
        </main>
      </div>`;
  }
}
