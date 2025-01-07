import { emailInput, firstNameInput, loginInput, phoneInput, secondNameInput } from './inputs';

export const editeProfileFormInputs = {
  email: emailInput,
  login: loginInput,
  first_name: firstNameInput,
  second_name: secondNameInput,
  display_name: {
    name: 'display_name',
    placeholder: 'Имя в чате',
    type: 'text',
  },
  phone: phoneInput,
};
