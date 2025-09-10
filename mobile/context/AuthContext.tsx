import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type User = {
  email: string;
};

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Hardcoded demo credentials
const DEMO_EMAIL = "user@example.com";
const DEMO_PASSWORD = "password123";

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = useCallback(async (email: string, password: string) => {
    // Simulate a short delay
    await new Promise((r) => setTimeout(r, 350));
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setUser({ email: DEMO_EMAIL });
      return;
    }
    throw new Error("Invalid email or password");
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    // In a real app, call API. For demo, accept anything and set user.
    await new Promise((r) => setTimeout(r, 350));
    // Optionally, you could also require exact DEMO creds to keep it consistent.
    setUser({ email });
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, signIn, signOut, signUp }),
    [user, signIn, signOut, signUp]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
