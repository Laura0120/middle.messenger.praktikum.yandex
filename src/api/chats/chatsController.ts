import {
  AddUserToChatRequestData,
  ChatDeleteRequestData,
  ChatResponse,
  ChatsCreateRequestData,
  ChatsGetRequestData,
  ChatTokenResponse,
  MessageResponse,
} from './types';
import chats from './chats';
import store from '../../store/store';

class ChatsController {
  getChats(data: ChatsGetRequestData) {
    return chats
      .getChats(data)
      .then((chats) => {
        store.set('chats', chats);
      })
      .catch((error) => {
        console.error('Ошибка загрузки списка чатов', error);
      });
  }

  createChat(data: ChatsCreateRequestData) {
    return chats
      .createChat(data)
      .then(() => {
        this.getChats({});
      })
      .catch((error) => {
        console.error('Ошибка создания чата', error);
      });
  }

  deleteChat(data: ChatDeleteRequestData) {
    return chats
      .deleteChat(data)
      .then(() => {
        this.getChats({});
      })
      .catch((error) => {
        console.error('Ошибка удаления чата', error);
      });
  }

  selectChat(data: ChatResponse) {
    store.set('selectedChat', data);
  }

  addUserToChat(data: AddUserToChatRequestData) {
    return chats.addUserToChat(data).catch((error) => {
      console.error('Ошибка добавления пользователя в чат', error);
    });
  }

  deleteUserFromChat(data: AddUserToChatRequestData) {
    return chats.deleteUserFromChat(data).catch((error) => {
      console.error('Ошибка удаления пользователя из чата', error);
    });
  }

  getChatToken(chatId: number) {
    return chats
      .getChatToken(chatId)
      .then((token) => token as ChatTokenResponse)
      .catch((error) => {
        console.error('Ошибка удаления пользователя из чата', error);
      });
  }

  addChatMessages(messages: MessageResponse[]) {
    store.set('selectedChatMessages', messages);
  }

  getChatMessages() {
    return store.getState().selectedChatMessages as MessageResponse[];
  }
}

export const chatsController = new ChatsController();
