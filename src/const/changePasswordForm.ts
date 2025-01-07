import { passwordPattern } from './patterns';
import { errorMessage } from './inputs';

export const changePasswordForm = {
  oldPassword: {
    name: 'oldPassword',
    placeholder: 'Старый пароль',
    type: 'password',
    pattern: passwordPattern,
    errorMessage: errorMessage,
    ariaErrorMessage: 'oldPassword-errors',
    required: true,
  },
  newPassword: {
    name: 'newPassword',
    placeholder: 'Новый пароль',
    type: 'password',
    pattern: passwordPattern,
    errorMessage: errorMessage,
    ariaErrorMessage: 'newPassword-errors',
    required: true,
  },
  repeatPassword: {
    name: 'repeatPassword',
    placeholder: 'Повторите новый пароль',
    type: 'password',
    pattern: passwordPattern,
    errorMessage: errorMessage,
    ariaErrorMessage: 'repeatPassword-errors',
    required: true,
  },
};
