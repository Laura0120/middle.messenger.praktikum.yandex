import EventBus from '../framework/EventBus';
import { set } from '../helpers/set';
export enum StoreEvents {
  Update = 'update',
}

export type TStore = Record<string, Record<string, string | null> | []>;

class Store extends EventBus {
  private state: TStore;

  constructor() {
    super();

    this.state = {
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string)
        : {
          avatar: null,
          display_name: null,
          email: null,
          first_name: null,
          id: null,
          login: null,
          phone: null,
          second_name: null,
        },
      selectedChat: {
        avatar: null,
        created_by: null,
        id: null,
        last_message: null,
        title: null,
        unread_count: null,
      },
      chats: [],
      selectedChatMessages: [],
    };
  }

  getState() {
    return this.state;
  }

  set(path: string, value: unknown) {
    this.state = set(this.state, path, value) as TStore;
    this.emit(StoreEvents.Update);
  }
}

export default new Store();
