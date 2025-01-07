import Block from '../framework/Block';

export interface IChatItemProps {
  contactName: string;
  message: string;
  messageDate: Date;
  unreadMessages?: number;
  onClick?: () => void;
}
export default class ChatItem extends Block {
  constructor(props: IChatItemProps) {
    super({
      ...props,
      messageDate: '7 Января 2025',
      events: {
        click: props.onClick,
      },
    });
  }

  override render() {
    return `<div class="chat_item">
        <div class="chat_avatar"></div>
        <div class="chat_wrapper">
          <div class="chat_header">
            <span class="chat_contact-name">{{contactName}}</span>
            <span class="chat_message-date">{{messageDate}}</span>
        </div> 
        <div class="chat_body">
          <p class="chat_message">{{message}}</p>
          <span class="chat_unread-messages">{{unreadMessages}}</span>
        </div>    
      </div>
    <div/>`;
  }
}
