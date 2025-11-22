import { StoreApi, UseBoundStore, create } from "zustand";
import { User } from "../lib/type-definition";

type AuthState = {
    user: any;
    setUser: (user: any) => void;
    logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
}));
