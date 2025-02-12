export type ChatsGetRequestData = {
  offset?: number;
  limit?: number;
  title?: string;
};

export type ChatDeleteRequestData = {
  chatId: number;
};

export type AddUserToChatRequestData = {
  users: number[];
  chatId: number;
};

export type ChatTokenResponse = { token: string };

export interface IChatResponseDTO {
  avatar: string;
  id: number;
  last_message: {
    user?: {
      avatar: string;
      login: string;
    };
    time?: string;
    content?: string;
  };
  title: string;
  unread_count: number;
}

export interface IChatResponse extends IChatResponseDTO {
  lastMessage: {
    user?: {
      avatar: string;
      login: string;
    };
    time?: string;
    content?: string;
  };
  title: string;
  unreadCount: number;
}

export type MessageResponse = {
  chat_id: number;
  content: string;
  file: File;
  id: number;
  is_read: boolean;
  time: Date;
  type: 'message';
  user_id: number;
};
