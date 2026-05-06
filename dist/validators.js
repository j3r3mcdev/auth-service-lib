import validator from "validator";
export function validateEmail(email) {
    return validator.isEmail(email);
}
export function validatePassword(password) {
    // Exemple simple : min 8 chars, 1 maj, 1 min, 1 chiffre
    return validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
    });
}
