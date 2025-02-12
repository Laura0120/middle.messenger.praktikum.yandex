export type TFormState = Record<string, { value: string; valid: boolean }>;

export const formValidate = (formState: TFormState): boolean => {
  return !Object.values(formState).some((input) => {
    return !input.valid;
  });
};

export const getFormData = (formState: TFormState): Record<string, string> => {
  return Object.keys(formState).reduce<Record<string, string>>((data, inputName) => {
    data[inputName] = formState[inputName].value;
    return data;
  }, {});
};

export function toFormData(formState: TFormState): Record<string, string> {
  return Object.entries(formState).reduce<Record<string, string>>((accumulator, currentValue) => {
    const fieldName = currentValue[0];
    accumulator[fieldName] = currentValue[1].value;
    return accumulator;
  }, {});
}
