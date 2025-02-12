import Block, { BlockProps } from '../framework/Block';
import { withChatsAndUser } from '../store/utils';
import ChatItem from './ChatItem';
import { IChatResponse } from '../api/chats/types';
import ChatsController from '../api/chats/chatsController';

const generateLists = (props: BlockProps) => {
  return {
    Chats: props.chats.map((chat: IChatResponse) => {
      const selectedClass = props.selectedChat?.id === chat.id ? 'chat_item--selected' : '';
      const unreadCountClass = selectedClass || !chat.unreadCount ? 'chat_item--read' : '';

      return new ChatItem({
        ...chat,
        user: props.user,
        class: `${selectedClass} ${unreadCountClass}`,
        onClick: () => ChatsController.selectChat(chat.id),
      });
    }),
  };
};

class ChatList extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      ...generateLists(props),
    });
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    const shouldBeUpdated = super.componentDidUpdate(oldProps, newProps);
    if (!shouldBeUpdated) {
      return false;
    }

    this.lists = {
      ...this.lists,
      ...generateLists(newProps),
    };

    return true;
  }

  override render(): string {
    return '<div>{{{ Chats }}}</div>';
  }
}

export default withChatsAndUser(ChatList);
