export const namePattern = new RegExp('^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]*$');
export const loginPattern = new RegExp('[a-z+\\d]{3,20}.*$', 'i');
export const emailPattern = new RegExp('^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$', 'i');
export const passwordPattern = new RegExp('(?=.*[A-ZА-ЯЁ]+)(?=.*\\d+)(?=.*\\w+).{8,40}');
export const phonePattern = new RegExp('((\\+)+([0-9]){10,15})$', 'i');
export const messagePattern = new RegExp('^\\s*\\S[^]*');
