import { emailPattern, loginPattern, messagePattern, namePattern, passwordPattern, phonePattern } from './patterns';

export interface IInput {
  name: string;
  type: string;
  placeholder?: string;
  pattern?: RegExp;
  errorMessage?: string;
  ariaErrorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
}
export const errorMessage = 'Недопустимое значение';

export const loginInput: IInput = {
  name: 'login',
  placeholder: 'Логин',
  type: 'text',
  pattern: loginPattern,
  errorMessage: errorMessage,
  ariaErrorMessage: 'login-errors',
  required: true,
};
export const passwordInput: IInput = {
  name: 'password',
  placeholder: 'Пароль',
  type: 'password',
  pattern: passwordPattern,
  errorMessage: errorMessage,
  ariaErrorMessage: 'password-errors',
  required: true,
};
export const emailInput: IInput = {
  name: 'email',
  placeholder: 'Почта',
  type: 'text',
  pattern: emailPattern,
  errorMessage: errorMessage,
  ariaErrorMessage: 'email-errors',
};

export const firstNameInput: IInput = {
  name: 'first_name',
  placeholder: 'Имя',
  type: 'text',
  pattern: namePattern,
  errorMessage: errorMessage,
  ariaErrorMessage: 'firstName-errors',
};

export const secondNameInput: IInput = {
  name: 'second_name',
  placeholder: 'Фамилия',
  type: 'text',
  pattern: namePattern,
  errorMessage: errorMessage,
  ariaErrorMessage: 'secondName-errors',
};

export const phoneInput: IInput = {
  name: 'phone',
  placeholder: 'Телефон',
  type: 'tel',
  pattern: phonePattern,
  errorMessage: errorMessage,
  ariaErrorMessage: 'phone-errors',
};

export const messageInput: IInput = {
  name: 'message',
  placeholder: 'Сообщение',
  type: 'text',
  pattern: messagePattern,
  required: true,
};
