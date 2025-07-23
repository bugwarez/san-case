import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import type { Permission } from "../routes/routeConfig";

export type User = {
  name: string;
  permissions: Permission[];
};

const USER_KEY = ["currentUser"];

const AuthContext = createContext<{
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: user } = useQuery<User | null>({
    queryKey: USER_KEY,
    initialData: null,
  });

  const login = (user: User) => {
    queryClient.setQueryData(USER_KEY, user);
  };

  const logout = () => {
    queryClient.setQueryData(USER_KEY, null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
