import store, { TStore, StoreEvents } from './store';
import Block, { BlockProps } from '../framework/Block';

function connect(mapStateToProps: (state: TStore) => TStore) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(blockProps: BlockProps) {
        super({ ...blockProps, ...mapStateToProps(store.getState()) });
        store.on(StoreEvents.Update, this._addState.bind(this));
      }

      _addState() {
        this.setProps({ ...mapStateToProps(store.getState()) });
      }
    };
  };
}

export const withUser = connect((state) => ({ user: { ...state.user } }));

export const withChatsAndUser = connect((state) => ({
  chats: state.chats,
  selectedChat: state.selectedChat,
  user: state.user,
  selectedChatMessages: state.selectedChatMessages,
}));

export const withSelectedChats = connect((state) => ({ selectedChat: state.selectedChat }));
