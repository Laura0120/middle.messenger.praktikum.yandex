import store, { StoreEvents } from './store';
import Block, { BlockProps } from '../framework/Block';
import { isEqual } from '../helpers/isEqual';

function connect(mapStateToProps: (state: Indexed<unknown>) => Indexed<unknown>) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(blockProps: BlockProps) {
        let state = mapStateToProps(store.getState());
        super({ ...blockProps?.props, ...state });

        store.on(StoreEvents.Update, () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            this.setProps({ ...mapStateToProps(store.getState()) });
          }

          state = newState;
        });
      }
    };
  };
}

export const withUser = connect((state: Indexed<unknown>) => ({ user: state.user }));

export const withChatsAndUser = connect((state: Indexed<unknown>) => ({
  chats: state.chats,
  selectedChat: state.selectedChat,
  user: state.user,
  selectedChatMessages: state.selectedChatMessages,
}));

export const withSelectedChats = connect((state: Indexed<unknown>) => ({ selectedChat: state.selectedChat }));
