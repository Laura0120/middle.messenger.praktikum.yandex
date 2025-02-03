import Block from '../framework/Block';
import Link from '../components/Link';
import Form from '../components/Form';
import InputBlock from '../components/InputBlock';
import Label from '../components/Label';
import Input from '../components/Input';
import { profileFormInputs } from '../const/profileForm';
import { withUser } from '../store/utils';
import { goToPath } from '../helpers/goToPath';
import { authController } from '../api/auth/authController';
import AvatarModal from '../components/AvatarModal';
import { render } from '../helpers/render';
import Button from '../components/Button';

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
    onClick: authController.logout,
  },
];

interface IProfileProps {
  user: Record<string, string>;
}

class Profile extends Block {
  protected _modal: Block | null = null;

  constructor(props: IProfileProps) {
    super({
      ...props,
      Avatar: new Button({
        text: props.user?.avatar
          ? `<img class='image' src='https://ya-praktikum.tech/api/v2/resources/${props.user?.avatar}' alt='аватар'>`
          : '',
        onClick: () => this.openModal(),
        type: 'button',
        class: 'avatar',
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
    this._modal = null;
  }
  openModal() {
    if (!this._modal) {
      this._modal = new AvatarModal({});
      if (this._modal) {
        render('profile-modal', this._modal);
      }
      return;
    }

    render('profile-modal', new AvatarModal({}));
  }

  override render(): string {
    console.log(this.props);
    return `<div class="page">
        <main>
          <h1>Профиль</h1>
          <div class='avatar-container'>
              {{{ Avatar }}}
          </div>
          {{{ Form }}}
          <div class="form_wrapper">
            {{{ Links }}}
          <div/>
        <main/>
        <div  id="profile-modal"></div>
      </div>`;
  }
}

export default withUser(Profile);
