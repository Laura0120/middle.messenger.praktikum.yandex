import { emailPattern, loginPattern, messagePattern, namePattern, passwordPattern, phonePattern } from './patterns';

export const errorMessage = 'Недопустимое значение';

export const loginInput = {
  name: 'login',
  placeholder: 'Логин',
  type: 'text',
  pattern: loginPattern,
  errorMessage: errorMessage,
  ariaErrorMessage: 'login-errors',
  required: true,
};
export const passwordInput = {
  name: 'password',
  placeholder: 'Пароль',
  type: 'password',
  pattern: passwordPattern,
  errorMessage: errorMessage,
  ariaErrorMessage: 'password-errors',
  required: true,
};
export const emailInput = {
  name: 'email',
  placeholder: 'Почта',
  type: 'text',
  pattern: emailPattern,
  errorMessage: errorMessage,
  ariaErrorMessage: 'email-errors',
};

export const firstNameInput = {
  name: 'first_name',
  placeholder: 'Имя',
  type: 'text',
  pattern: namePattern,
  errorMessage: errorMessage,
  ariaErrorMessage: 'firstName-errors',
};

export const secondNameInput = {
  name: 'second_name',
  placeholder: 'Фамилия',
  type: 'text',
  pattern: namePattern,
  errorMessage: errorMessage,
  ariaErrorMessage: 'secondName-errors',
};

export const phoneInput = {
  name: 'phone',
  placeholder: 'Телефон',
  type: 'tel',
  pattern: phonePattern,
  errorMessage: errorMessage,
  ariaErrorMessage: 'phone-errors',
};

export const messageInput = {
  name: 'message',
  placeholder: 'Сообщение',
  type: 'text',
  pattern: messagePattern,
  required: true,
};
