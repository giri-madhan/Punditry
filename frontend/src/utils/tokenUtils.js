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

export const storeToken = (token) => {
  const encryptedToken = encryptToken(token);
  localStorage.setItem("auth_token", encryptedToken);
};

export const getStoredToken = () => {
  const encryptedToken = localStorage.getItem("auth_token");
  return encryptedToken ? decryptToken(encryptedToken) : null;
};

export const removeToken = () => {
  localStorage.removeItem("auth_token");
};
