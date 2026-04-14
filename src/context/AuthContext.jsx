import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('fitbharat-auth') === 'true';
  });

  const [authUser, setAuthUser] = useState(() => {
    const saved = localStorage.getItem('fitbharat-auth-user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    localStorage.setItem('fitbharat-auth', String(isAuthenticated));
    if (authUser) {
      localStorage.setItem('fitbharat-auth-user', JSON.stringify(authUser));
    }
  }, [isAuthenticated, authUser]);

  const login = (email, password, name) => {
    // Store credentials locally (simulated auth)
    const user = { email, name: name || email.split('@')[0], joinedAt: new Date().toISOString() };
    setAuthUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('fitbharat-auth', 'true');
    localStorage.setItem('fitbharat-auth-user', JSON.stringify(user));
    return { success: true };
  };

  const signup = (email, password, name) => {
    const user = { email, name, joinedAt: new Date().toISOString() };
    setAuthUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('fitbharat-auth', 'true');
    localStorage.setItem('fitbharat-auth-user', JSON.stringify(user));
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthUser(null);
    localStorage.removeItem('fitbharat-auth');
    localStorage.removeItem('fitbharat-auth-user');
    localStorage.removeItem('fitbharat-user');
    localStorage.removeItem('fitbharat-onboarded');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
