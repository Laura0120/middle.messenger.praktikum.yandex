import Block, { BlockProps } from '../framework/Block';
import { formatTime } from '../helpers/time';
import СhatsController from '../api/chats/chatsController';
import { WSTransport, WSTransportEvents } from '../api/wsService';
import { MessageResponse } from '../api/chats/types';
import { messageSocketList } from '../api/wsService';
import chatsController from '../api/chats/chatsController';
import isArray from '../helpers/isArray';

export default class ChatItem extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      lastMessage: props.lastMessage?.content,
      lastMessageTime: formatTime(props.lastMessage?.time),
      avatar: props.lastMessage?.user.avatar,
      events: {
        click: () => {
          props.onClick();
          this.selectChat();
        },
      },
    });
  }

  selectChat() {
    СhatsController.getChatToken(this.props.id).then((data) => {
      if (!data) {
        return;
      }
      const userId = this.props.user.id;
      const chatId = (this.props?.id as number) ?? null;
      const token = data.token ?? null;

      if (userId && chatId && token) {
        const socket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
        if (socket) {
          Object.values(messageSocketList).forEach((socket) => socket.close());
        }

        messageSocketList[chatId] = socket;

        socket.on(WSTransportEvents.Message, (messages: MessageResponse[]) => this.setMessage(messages));
        socket.connect().then(() =>
          socket.send({
            type: 'get old',
            content: '0',
          }),
        );
      }
    });
  }

  setMessage(messages: MessageResponse | MessageResponse[]) {
    if (isArray(messages)) {
      chatsController.addChatMessages(messages);
    } else {
      const oldMessages = chatsController.getChatMessages();
      chatsController.addChatMessages([messages, ...oldMessages]);
    }
  }

  override render() {
    return `<div class="chat_item {{class}}">
        <div class="chat_avatar"></div>
        <div class="chat_wrapper">
          <div class="chat_header">
            <span class="chat_title">{{title}}</span>
            <span class="chat_message-date">{{lastMessageTime}}</span>
          </div> 
        <div class="chat_body">
          <p class="chat_message">{{lastMessage}}</p>
        </div>    
        <span class="chat_unread-messages">{{unreadCount}}</span>
      </div>
    </div>`;
  }
}
