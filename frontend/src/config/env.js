export const config = {
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:5020",
  API_TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 10000,
  JWT_STORAGE_KEY:
    import.meta.env.VITE_JWT_STORAGE_KEY || "_punditry_auth_jwt_token_v1",
  USER_STORAGE_KEY:
    import.meta.env.VITE_USER_STORAGE_KEY || "_punditry_user_data_v1",
};

// Security constants
export const securityConfig = {
  TOKEN_EXPIRY: 3600, // 1 hour in seconds
  TOKEN_REFRESH_THRESHOLD: 300, // 5 minutes in seconds
  MAX_LOGIN_ATTEMPTS: 5,
  LOGIN_ATTEMPT_TIMEOUT: 900, // 15 minutes in seconds
};

// Validation constants
export const validationConfig = {
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 50,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
};
