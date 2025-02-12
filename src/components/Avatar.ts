import Block, { BlockProps } from '../framework/Block';
import { withUser } from '../store/utils';

class Avatar extends Block {
  constructor(props: BlockProps) {
    super({ ...props });
  }

  override render() {
    return '<button type="button" class="avatar"><img class="image" src="https://ya-praktikum.tech/api/v2/resources/{{{user.avatar}}}"><button/>';
  }
}
export default withUser(Avatar);
