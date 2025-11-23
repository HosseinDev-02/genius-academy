"use client";
import React from "react";
import jwt from "jsonwebtoken";
import { User } from "@/src/lib/type-definition";

type LoginProps = {
    phone_number: string;
    password: string;
};

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (
        loginInfo: LoginProps
    ) => Promise<{ message: string; success: boolean }>;
    logout: () => Promise<{ message: string; success: boolean }>;
    isLoggedIn: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export default function RootLayoutProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = React.useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const login = async (loginInfo: LoginProps) => {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginInfo),
            });
            const result = await response.json();

            const decoded: any = jwt.decode(result.token);
            setUser(decoded);

            if (result.success) {
                setIsLoggedIn(true);
                return {
                    message: result.message,
                    success: true,
                };
            } else {
                throw new Error(result.error);
            }
        } catch (error: any) {
            console.log("error", error);
            return {
                message: error.message,
                success: false,
            };
        }
    };

    const logout = async () => {
        try {
            const response = await fetch("/api/logout", {
                method: "POST",
            });
            const result = await response.json();

            console.log('result :', result);

            if (result.success) {
                setUser(null);
                setIsLoggedIn(false);
                return {
                    message: result.message,
                    success: true,
                };
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            return {
                message:
                    error instanceof Error ? error.message : "خطایی رخ داد",
                success: false,
            };
        }
    };

    React.useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch("/api/me");
            const result = await response.json();
            console.log("fetch user result :", result);
            console.log("is logged in :", Boolean(result.user));

            if (result.user) {
                setIsLoggedIn(Boolean(result.user));
                setUser(result.user);
            }
        };

        fetchUserData();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, setUser, login, logout, isLoggedIn }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};
