import Block from '../framework/Block';
import Link from '../components/Link';
import Form from '../components/Form';
import InputBlock from '../components/InputBlock';
import Label from '../components/Label';
import Input from '../components/Input';
import { profileFormInputs } from '../const/profileForm';
import { withUser } from '../store/utils';
import { goToPath } from '../helpers/goToPath';
import authController from '../api/auth/authController';
import AvatarModal from '../components/AvatarModal';
import render from '../helpers/render';
import Avatar from '../components/Avatar';

const profileLinks = [
  {
    text: 'Изменить данные',
    class: 'link',
    onClick: () => {
      goToPath('/settings-edite');
    },
  },
  {
    text: 'Изменить пароль',
    class: 'link',
    onClick: () => {
      goToPath('/settings-changePassword');
    },
  },
  {
    text: 'Выйти',
    class: 'link',
    onClick: () => authController.logout(),
  },
];

interface IProfileProps {
  user: Record<string, string>;
}

class Profile extends Block {
  constructor(props: IProfileProps) {
    super({
      ...props,
      Avatar: new Avatar({
        events: {
          click: () => this.openModal(),
        },
      }),
      Form: new Form({
        Inputs: Object.values(profileFormInputs).map(
          ({ name, type, placeholder, errorMessage, disabled }) =>
            new InputBlock({
              Label: new Label({ name, label: placeholder ?? '' }),
              Input: new Input({
                name,
                type,
                placeholder,
                errorMessage,
                disabled,
                value: props.user?.[name],
              }),
            }),
        ),
      }),
      Links: profileLinks.map((item) => new Link({ text: item.text, class: item.class, onClick: item.onClick })),
    });
  }

  openModal() {
    render('profile-modal', new AvatarModal({}));
  }

  override render(): string {
    return `<div class="page profile">
        <main>
          <h1>Профиль</h1>
          <div class='avatar-container'>
            {{{ Avatar }}}
          </div>
          {{{ Form }}}
          <div class="form_wrapper">
            {{{ Links }}}
          </div>
          <div id="profile-modal"></div>
        </main>
      </div>`;
  }
}

export default withUser(Profile);
