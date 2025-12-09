import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { User } from "@/lib/types/user.type";
import { loginUser, verifyTwoFactor } from "@/lib/api/users";

interface UserState {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  verify2FA: (email: string, code: string) => Promise<boolean>;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      authenticated: false,
      loading: false,
      error: null,

      async login(email, password) {
        set({ loading: true, error: null });

        const res = await loginUser(email, password);

        if (!res.success) {
          set({
            loading: false,
            error: res.message ?? "Login mislukt",
          });
          return false;
        }

        set({
          user: res.user,
          loading: false,
        });

        return true;
      },

    async verify2FA(email, code) {
        set({ loading: true, error: null });

        const res = await verifyTwoFactor(email, code);

        if (!res.success) {
            set({
            loading: false,
            error: res.message ?? "Ongeldige code",
            });
            return false;
        }

        document.cookie = "is-authenticated=true; path=/; max-age=6400";
        
        set({
            user: res.user!,
            authenticated: true,
            loading: false,
            error: null,
        });

        window.location.href = "/";
        return true;
        },

        logout() {
        document.cookie = "is-authenticated=; path=/; max-age=0";
        
        set({
            user: null,
            authenticated: false,
            error: null,
            loading: false,
        });
        
        window.location.href = "/login";
        },
    }),

    {
      name: "auth-store",

      storage: createJSONStorage(() => ({
        getItem: (key) => {
          if (typeof window === "undefined") return null;
          
          const sessionValue = sessionStorage.getItem(key);
          if (sessionValue) return JSON.parse(sessionValue);
          
          const cookie = document.cookie
            ?.split("; ")
            ?.find((row) => row.startsWith(key + "="))
            ?.split("=")[1];

          return cookie ? JSON.parse(decodeURIComponent(cookie)) : null;
        },

        setItem: (key, value) => {
          if (typeof window === "undefined") return;
          
          sessionStorage.setItem(key, JSON.stringify(value));
          
          document.cookie = `${key}=${encodeURIComponent(
            JSON.stringify(value)
          )}; path=/; max-age=3600;`;
        },

        removeItem: (key) => {
          if (typeof window === "undefined") return;
          
          sessionStorage.removeItem(key);
          document.cookie = `${key}=; path=/; max-age=0;`;
        },
      })),

      partialize: (state) => ({
        user: state.user,
        authenticated: state.authenticated,
      }),
    }
  )
);