import Block, { BlockProps } from '../framework/Block';
import Form from './Form';
import InputBlock from './InputBlock';
import Input from './Input';
import Button from './Button';
import { formValidate, getFormData, TFormState } from '../helpers/formValidation';
import { messageInput } from '../const/inputs';
import { withChatsAndUser } from '../store/utils';
import { messageSocketList } from '../api/wsService';
import { MessageResponse } from '../api/chats/types';
import MessageItem from './MessageItem';
import Menu from './Menu';

const generateLists = (props: BlockProps) => {
  return {
    Messages: props.selectedChatMessages.map(
      (message: MessageResponse) =>
        new MessageItem({
          text: message.content,
          time: message.time,
          file: message.file,
          user_id: message.user_id,
        }),
    ),
  };
};

class ChatFeed extends Block {
  protected state: TFormState;

  constructor(props: BlockProps) {
    super({
      ...props,
      ...generateLists(props),
      Menu: new Menu({}),
      Form: new Form({
        Inputs: [
          new InputBlock({
            Input: new Input({
              ...messageInput,
              setInputValid: (valid) => {
                this.state.message.valid = valid;
              },
              setInputValue: (value) => {
                this.state.message.value = value;
              },
            }),
          }),
        ],
        Button: new Button({
          type: 'submit',
          text: "<img src='svg/arrow.svg' alt='arrow image'>",
          class: 'round-button button',
        }),
        onSubmit: () => {
          if (!formValidate(this.state)) {
            return;
          }
          this.handleSendMessage(getFormData(this.state).message);
        },
      }),
      events: {
        click: props.onClick,
      },
    });
    this.state = { message: { value: '', valid: true } };
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

  handleSendMessage(text: string) {
    const chatId = this.props?.selectedChat.id;
    const socket = messageSocketList[chatId];

    if (text) {
      const message = { content: text, type: 'message' };
      socket.send(message);
    }
    // @ts-expect-error сброс формы, после отправки сообщения.
    this.children.Form.element?.reset();
  }

  override render() {
    return `        
        ${
  !this.props.selectedChat.id
    ? '<div <div class="chat-feed_wrapper chat-feed_wrapper--text">Выберите чат чтобы отправить сообщение</div>'
    : `<div class="chat-feed_wrapper">
         <div class="chat-feed_header">
           <div class="chat-feed_contact">
             <div class="chat_avatar"></div>
             <div class="chat_contact-name">{{selectedChat.title}}</div>   
           </div> 
           {{{ Menu }}}
         </div>        
         <div class="chat-feed_main">
           {{{ Messages }}}
         </div>
         {{{ Form }}}
      </div>`
}`;
  }
}
export default withChatsAndUser(ChatFeed);
