import validator from 'validator';
export function validateEmail(email) {
    return validator.isEmail(email);
}
export function validatePassword(password) {
    return password.length >= 8;
}
