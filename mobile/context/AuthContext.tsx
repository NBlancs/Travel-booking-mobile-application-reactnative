import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authApi, tokenStorage, userApi, User } from "../lib/api";

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, username: string, password: string) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app start and fetch fresh user data
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = await tokenStorage.getUser();
        const token = await tokenStorage.getToken();
        
        if (storedUser && token) {
          // Set stored user first for immediate display
          setUser(storedUser);
          
          // Then fetch fresh user data from server to get latest profileImage etc.
          try {
            const freshUser = await userApi.getProfile();
            if (freshUser) {
              setUser(freshUser);
              await tokenStorage.setUser(freshUser);
            }
          } catch (error) {
            console.log("Could not refresh user data:", error);
            // Keep using stored user if fetch fails
          }
        }
      } catch (error) {
        console.log("Error checking auth:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    await authApi.logout();
    setUser(null);
  }, []);

  const signUp = useCallback(async (email: string, username: string, password: string) => {
    try {
      const response = await authApi.register(email, username, password);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  }, []);

  const updateUser = useCallback(async (updatedUser: User) => {
    setUser(updatedUser);
    await tokenStorage.setUser(updatedUser);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const freshUser = await userApi.getProfile();
      if (freshUser) {
        setUser(freshUser);
        await tokenStorage.setUser(freshUser);
      }
    } catch (error) {
      console.log("Could not refresh user:", error);
    }
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, isLoading, signIn, signOut, signUp, updateUser, refreshUser }),
    [user, isLoading, signIn, signOut, signUp, updateUser, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

