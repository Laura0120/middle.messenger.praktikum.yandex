import Block, { BlockProps } from '../framework/Block';
import { withUser } from '../store/utils';
import { formatTime } from '../helpers/time';

class MessageItem extends Block {
  constructor(props: BlockProps) {
    const messageTime = props?.time as string;
    const formattedTime = messageTime ? formatTime(messageTime) : '';
    super({ ...props, formattedTime });
  }

  override render(): string {
    const isMyMessage = this.props?.user_id === this.props?.user?.id;

    return `
      <article class='${isMyMessage ? 'chat-feed_message--outgoing' : 'chat-feed_message--incoming'} chat-feed_message'>
        <p>{{text}}</p>
        <span class='chat-feed_message_time'>{{formattedTime}}</span>
      </article>
    `;
  }
}

export default withUser(MessageItem);
