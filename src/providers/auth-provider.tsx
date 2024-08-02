"use client";

import { SignInFormType } from "@/app/(auth)/sign-in/sign-in-form";
import { api } from "@/lib/api";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { User } from "@/types/user";
import { headers } from "next/headers";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextProps {
  signIn: (data: SignInFormType) => Promise<void>;
  signOut: () => void;
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthResponseSchema {
  user: {
    id: string;
    username: string;
    email: string;
  };
  token: string;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const { toast } = useToast();

  const isAuthenticated = !!user;

  useEffect(() => {
    async function getProfile(token: string) {
      const response = await api("/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await response.json();

      setUser(data);
    }

    const { "@token": token } = parseCookies();

    if (token) {
      getProfile(token);
    }
  }, []);

  async function signIn({ email, password }: SignInFormType) {
    const response = await api("/authenticate", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const result = await response.json();

      toast({
        title: result.message,
      });

      return;
    }

    const { user, token } = (await response.json()) as AuthResponseSchema;

    setUser(user);
    setCookie(null, "@token", token, {
      maxAge: 60 * 60 * 1 * 24,
    });
    router.push("/taskflow/tasks");
  }

  function signOut() {
    destroyCookie(null, "@token", { path: "/" });
    setUser(null);
    router.push("/sign-in");
  }

  return (
    <AuthContext.Provider value={{ signIn, user, isAuthenticated, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
