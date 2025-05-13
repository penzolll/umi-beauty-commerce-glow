
import { createContext, useState, useContext, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string) => {
    // This is a mock authentication. In a real app, you would call your authentication API
    if (email === "admin@umibeauty.com" && password === "password") {
      const user = { id: "1", email, name: "Admin User", isAdmin: true };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return;
    } else if (email && password) { // Allow any non-empty credentials for demo
      const user = { id: "2", email, name: "Customer User", isAdmin: false };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return;
    }
    
    throw new Error("Invalid credentials");
  };

  const register = async (email: string, password: string, name: string) => {
    // This is a mock registration. In a real app, you would call your registration API
    if (email && password && name) {
      const user = { id: Date.now().toString(), email, name, isAdmin: false };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return;
    }
    
    throw new Error("Invalid registration details");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
