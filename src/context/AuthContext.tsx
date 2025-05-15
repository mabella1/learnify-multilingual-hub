
import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "student" | "instructor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for demonstration
const MOCK_USERS = [
  {
    id: "1",
    name: "Student User",
    email: "student@example.com",
    password: "password123",
    role: "student" as UserRole,
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "2",
    name: "Instructor User",
    email: "instructor@example.com",
    password: "password123",
    role: "instructor" as UserRole,
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "admin" as UserRole,
    avatar: "https://i.pravatar.cc/150?img=3"
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const user = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error("Invalid credentials");
      }
      
      // Remove password before storing user
      const { password: _, ...userWithoutPassword } = user;
      
      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      setCurrentUser(userWithoutPassword);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error("User already exists");
      }
      
      // Create new user (in a real app, this would be handled by the backend)
      const newUser = {
        id: String(MOCK_USERS.length + 1),
        name,
        email,
        role: "student" as UserRole,
        avatar: `https://i.pravatar.cc/150?img=${MOCK_USERS.length + 4}`
      };
      
      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(newUser));
      setCurrentUser(newUser);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      login,
      register,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
