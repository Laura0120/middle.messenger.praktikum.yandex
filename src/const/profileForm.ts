import { emailInput, firstNameInput, IInput, loginInput, phoneInput, secondNameInput } from './inputs';

export const profileFormInputs: Record<string, IInput> = {
  avatar: {
    name: 'avatar',
    placeholder: '',
    type: 'file',
  },
  email: { ...emailInput, disabled: true },
  login: { ...loginInput, disabled: true },
  first_name: { ...firstNameInput, disabled: true },
  second_name: { ...secondNameInput, disabled: true },
  display_name: { name: 'display_name', placeholder: 'Имя в чате', type: 'text', disabled: true },
  phone: { ...phoneInput, disabled: true },
};
