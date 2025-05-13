
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
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
    // Check session storage first (for non-persistent sessions)
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) {
      return JSON.parse(sessionUser);
    }
    
    // Then check local storage (for persistent sessions)
    const localUser = localStorage.getItem("user");
    return localUser ? JSON.parse(localUser) : null;
  });

  // Function to check if the token has expired
  useEffect(() => {
    const checkSession = () => {
      const expiryTime = localStorage.getItem("sessionExpiry") || sessionStorage.getItem("sessionExpiry");
      if (expiryTime && parseInt(expiryTime) < Date.now()) {
        // Session expired, log the user out
        logout();
        toast.error("Your session has expired. Please login again.");
      }
    };
    
    // Check on load and then every 5 minutes
    checkSession();
    const interval = setInterval(checkSession, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, password: string, rememberMe = false) => {
    // This is a mock authentication. In a real app, you would call your authentication API
    if (email === "admin@umibeauty.com" && password === "password") {
      const user = { id: "1", email, name: "Admin User", isAdmin: true };
      setUser(user);
      
      // Set session expiry (24 hours for remember me, 1 hour for regular session)
      const expiryTime = Date.now() + (rememberMe ? 24 : 1) * 60 * 60 * 1000;
      
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("sessionExpiry", expiryTime.toString());
      } else {
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("sessionExpiry", expiryTime.toString());
      }
      return;
    } else if (email && password) { // Allow any non-empty credentials for demo
      const user = { id: "2", email, name: "Customer User", isAdmin: false };
      setUser(user);
      
      // Set session expiry (24 hours for remember me, 1 hour for regular session)
      const expiryTime = Date.now() + (rememberMe ? 24 : 1) * 60 * 60 * 1000;
      
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("sessionExpiry", expiryTime.toString());
      } else {
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("sessionExpiry", expiryTime.toString());
      }
      return;
    }
    
    throw new Error("Invalid credentials");
  };

  const register = async (email: string, password: string, name: string) => {
    // This is a mock registration. In a real app, you would call your registration API
    if (email && password && name) {
      // Check for existing emails (mock implementation)
      if (email === "admin@umibeauty.com") {
        throw new Error("Email already registered");
      }
      
      const user = { id: Date.now().toString(), email, name, isAdmin: false };
      setUser(user);
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("sessionExpiry", (Date.now() + 60 * 60 * 1000).toString()); // 1 hour
      return;
    }
    
    throw new Error("Invalid registration details");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("sessionExpiry");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("sessionExpiry");
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
