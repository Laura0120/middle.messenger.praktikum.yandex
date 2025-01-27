export const namePattern = new RegExp('^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]*$');
export const loginPattern = new RegExp('[a-z+\\d]{3,20}.*$', 'i');
export const emailPattern = new RegExp('^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w)$', 'i');
export const passwordPattern = new RegExp('(?=.*[A-ZА-ЯЁ]+)(?=.*\\d+)(?=.*\\w+).{8,40}');
export const phonePattern = new RegExp('^[[+*]\d]{10,15}.*$');
export const messagePattern = new RegExp('^\\s*\\S[^]*');
