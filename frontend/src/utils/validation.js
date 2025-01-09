import { validationConfig } from "../config/env";

export const validateUsername = (username) => {
  if (!username) return "Username is required";
  if (username.length < validationConfig.USERNAME_MIN_LENGTH) {
    return `Username must be at least ${validationConfig.USERNAME_MIN_LENGTH} characters`;
  }
  if (username.length > validationConfig.USERNAME_MAX_LENGTH) {
    return `Username must be less than ${validationConfig.USERNAME_MAX_LENGTH} characters`;
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";

  if (password.length < validationConfig.PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${validationConfig.PASSWORD_MIN_LENGTH} characters`;
  }
  if (password.length > validationConfig.PASSWORD_MAX_LENGTH) {
    return `Password must be less than ${validationConfig.PASSWORD_MAX_LENGTH} characters`;
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  if (!hasUpperCase)
    return "Password must include at least one uppercase letter";
  if (!hasLowerCase)
    return "Password must include at least one lowercase letter";
  if (!hasNumber) return "Password must include at least one number";
  if (!hasSpecialChar)
    return "Password must include at least one special character (!@#$%^&*)";

  return null;
};
