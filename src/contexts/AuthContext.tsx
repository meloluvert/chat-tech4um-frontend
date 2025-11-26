"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "@/lib/api/auth";

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    const response = await authApi.login({ email, password });

    const token = response.data.accessToken;
    localStorage.setItem("token", token);

    const userData = response.data.user;
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  async function register(username: string, email: string, password: string) {
    await authApi.register({ username, email, password });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
