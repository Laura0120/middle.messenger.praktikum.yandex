import EventBus from '../framework/EventBus';
import { set } from '../helpers/set';
export enum StoreEvents {
  Update = 'update',
}

interface IStore {
  user: Record<string, string | null>;
  selectedChat: Record<string, string | null>;
  chats: [];
  selectedChatMessages: [];
}
class Store extends EventBus {
  private state: IStore;

  constructor() {
    super();
    this.state = {
      user: {
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
    this.state = set(this.state, path, value) as IStore;
    this.emit(StoreEvents.Update);
  }
}

export default new Store();
