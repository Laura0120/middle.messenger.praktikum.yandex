import { HTTPTransport } from '../apiService';
import { AddUserToChatRequestData, ChatDeleteRequestData, ChatsGetRequestData } from './types';

const chatsAPIInstance = new HTTPTransport('/api/v2/chats');

function getChats(data: ChatsGetRequestData) {
  return chatsAPIInstance.get('', { data });
}

function createChat(data: Record<string, string>) {
  return chatsAPIInstance.post('', { data });
}

function deleteChat(data: ChatDeleteRequestData) {
  return chatsAPIInstance.delete('', { data });
}

function addUserToChat(data: AddUserToChatRequestData) {
  return chatsAPIInstance.put('/users', { data });
}

function deleteUserFromChat(data: AddUserToChatRequestData) {
  return chatsAPIInstance.delete('/users', { data });
}

function getChatToken(chatId: number) {
  return chatsAPIInstance.post(`/token/${chatId}`);
}

export default { getChats, createChat, deleteChat, addUserToChat, deleteUserFromChat, getChatToken };
