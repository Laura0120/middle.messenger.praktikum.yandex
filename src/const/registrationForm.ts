import { passwordPattern } from './patterns';
import {
  emailInput,
  errorMessage,
  firstNameInput,
  loginInput,
  passwordInput,
  phoneInput,
  secondNameInput,
} from './inputs';

export const registrationFormInputs = {
  email: emailInput,
  login: loginInput,
  first_name: firstNameInput,
  second_name: secondNameInput,
  phone: phoneInput,
  password: passwordInput,
  repeatPassword: {
    name: 'repeatPassword',
    placeholder: 'Пароль (еще раз)',
    type: 'password',
    pattern: passwordPattern,
    errorMessage: errorMessage,
    ariaErrorMessage: 'repeatPassword-errors',
    required: true,
  },
};
