import Block from '../framework/Block';
import Form from './Form';
import InputBlock from './InputBlock';
import Input from './Input';
import Button from './Button';
import { formValidate, getFormData, TFormState } from '../helpers/formValidation';
import { messageInput } from '../const/inputs';

interface IChatFeedProps {
  contactName: string;
  onClick?: () => void;
}
export default class ChatFeed extends Block {
  protected state: TFormState;

  constructor(props: IChatFeedProps) {
    super({
      ...props,

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
        }),
        onSubmit: () => {
          if (!formValidate(this.state)) {
            return;
          }
          console.log(getFormData(this.state));
        },
      }),
      events: {
        click: props.onClick,
      },
    });
    this.state = { message: { value: '', valid: true } };
  }

  override render() {
    return `<div class="chat-feed_wrapper">
        <div class="chat-feed_header">
          <div class="chat-feed_contact">
            <div class="chat_avatar"></div>
            <div class="chat_contact-name">{{contactName}}</div>
          </div>
          <button>...</button>
        </div>        
        <div class="chat-feed_main">
          <p class="chat-feed_date">19 июня</p>
          <div class="chat-feed_message chat-feed_message--incoming">
            <p>Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.</p>
            <span class="chat-feed_message_time">11:30</span>
          </div>
          <div class="chat-feed_message chat-feed_message--outgoing"> 
            <p>Круто!</p>
            <span class="chat-feed_message_time">11:30</span>
          </div>
        </div>
        
        <div class="chat-feed_sending">
            {{{ Form }}}   
        </div>
    <div/>`;
  }
}
