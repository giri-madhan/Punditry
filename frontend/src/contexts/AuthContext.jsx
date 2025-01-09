import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getStoredToken,
  storeToken,
  removeToken,
  checkTokenRefresh,
} from "../utils/tokenUtils";
import { config } from "../config/env";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getStoredToken());
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(config.USER_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (token) {
      storeToken(token);
    } else {
      removeToken();
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(config.USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(config.USER_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (token && checkTokenRefresh(token)) {
      const refreshToken = async () => {
        try {
          const response = await fetch(`${config.API_URL}/auth/refresh`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setToken(data.token);
          } else {
            logout();
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          logout();
        }
      };

      refreshToken();
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    setUser(null);
    removeToken();
    localStorage.removeItem(config.USER_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
