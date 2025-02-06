import {
  AddUserToChatRequestData,
  ChatDeleteRequestData,
  IChatResponseDTO,
  ChatsGetRequestData,
  ChatTokenResponse,
  MessageResponse,
  IChatResponse,
} from './types';
import chats from './chats';
import store from '../../store/store';

const toChats = (chats: IChatResponseDTO[]): IChatResponse[] => {
  return chats
    .map((chat) => ({
      ...chat,
      lastMessage: chat.last_message,
      unreadCount: chat.unread_count,
    }))
    .sort((a, b) => new Date(a.lastMessage?.time || '').getTime() - new Date(b.lastMessage?.time || '').getTime());
};

class ChatsController {
  getChats(data: ChatsGetRequestData) {
    return chats
      .getChats(data)
      .then((chats) => store.set('chats', toChats(chats as IChatResponseDTO[])))
      .catch((error) => console.error('Ошибка загрузки списка чатов', error));
  }

  createChat(data: Record<string, string>) {
    return chats
      .createChat(data)
      .then(() => this.getChats({}))
      .catch((error) => {
        console.error('Ошибка создания чата', error);
      });
  }

  deleteChat(data: ChatDeleteRequestData) {
    return chats
      .deleteChat(data)
      .then(() => this.getChats({}))
      .catch((error) => {
        console.error('Ошибка удаления чата', error);
      });
  }

  selectChat(id: number) {
    store.set(
      'selectedChat',
      // @ts-expect-error выбор чата всегда при наличии чатов
      store.getState().chats.find((el) => el.id === id) as IChatResponse,
    );
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
        console.error('Ошибка получения токена', error);
      });
  }

  addChatMessages(messages: MessageResponse[]) {
    store.set('selectedChatMessages', messages.reverse());
  }

  getChatMessages() {
    return store.getState().selectedChatMessages as MessageResponse[];
  }
}

export default new ChatsController();
