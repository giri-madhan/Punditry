import { config, securityConfig } from "../config/env";

// Simple encryption/decryption using base64 (for basic security)
// In production, consider using more secure encryption methods
const encryptToken = (token) => {
  return btoa(token);
};

const decryptToken = (encryptedToken) => {
  try {
    return atob(encryptedToken);
  } catch {
    return null;
  }
};

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp <= now;
  } catch {
    return true;
  }
};

const shouldRefreshToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp - now <= securityConfig.TOKEN_REFRESH_THRESHOLD;
  } catch {
    return false;
  }
};

export const storeToken = (token) => {
  if (!token || isTokenExpired(token)) return null;
  const encryptedToken = encryptToken(token);
  localStorage.setItem(config.JWT_STORAGE_KEY, encryptedToken);
  return token;
};

export const getStoredToken = () => {
  const encryptedToken = localStorage.getItem(config.JWT_STORAGE_KEY);
  const token = encryptedToken ? decryptToken(encryptedToken) : null;

  if (!token || isTokenExpired(token)) {
    removeToken();
    return null;
  }

  return token;
};

export const removeToken = () => {
  localStorage.removeItem(config.JWT_STORAGE_KEY);
};

export const checkTokenRefresh = (token) => {
  return token && shouldRefreshToken(token);
};
