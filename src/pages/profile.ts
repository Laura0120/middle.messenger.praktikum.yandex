import Block from '../framework/Block';
import Link from '../components/Link';
import Form from '../components/Form';
import InputBlock from '../components/InputBlock';
import Label from '../components/Label';
import Input from '../components/Input';
import Navigation from '../components/Navigation';
import ErrorMessage from '../components/InputErrorMessage';
import { profileFormInputs } from '../const/profileForm';

const profileLinks = [
  { href: '#', text: 'Изменить данные', class: 'link' },
  { href: '#', text: 'Изменить пароль', class: 'link' },
  { href: '#', text: 'Выйти', class: 'link' },
];

interface IProfileProps {
  Navigation: Navigation;
  Links: Link[];
  Form: Form;
}
export class Profile extends Block {
  constructor(props: IProfileProps) {
    super({
      ...props,
      Form: new Form({
        Inputs: Object.values(profileFormInputs).map(
          ({ name, type, placeholder, errorMessage, ariaErrorMessage, pattern, required, disabled }) =>
            new InputBlock({
              Label: new Label({ name, label: placeholder }),
              Input: new Input({
                name,
                type,
                placeholder,
                errorMessage,
                pattern,
                required,
                disabled,
              }),
              ErrorMessage: new ErrorMessage({
                errorMessage,
                ariaErrorMessage,
              }),
            }),
        ),
      }),
      Links: profileLinks.map((item) => new Link({ href: item.href, text: item.text, class: item.class })),
    });
  }

  override render(): string {
    return `<div class="page" id="app">
        <header>
          {{{ Navigation }}}
        </header>
        <main>
          <h1>Профиль</h1>
          {{{ Form }}}
          <div class="form_wrapper">
            {{{ Links }}}
          <div/>
        <main/>
      </div>`;
  }
}
