"use client";
import { StateProp } from "@/src/lib/definition";
import React, { createContext, useState } from "react";

type HeaderContextType = {
    mobileMenuOpen: StateProp<boolean>;
    searchModalShow: StateProp<boolean>;
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export default function HeaderProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const showMobileMenu = useState(false);
    const searchModalShow = useState(false)
    return (
        <HeaderContext.Provider value={{ mobileMenuOpen: showMobileMenu, searchModalShow }}>
            {children}
        </HeaderContext.Provider>
    );
}

export const useHeaderContext = () => {
    const context = React.useContext(HeaderContext);
    if (!context) {
        throw new Error("useHeader must be used within a HeaderProvider");
    }
    return context;
};
