"use client";
import React, { createContext, useContext, useState } from "react";
import Sidebar from "./Sidebar";
import AdminPanelHeader from "./AdminPanelHeader";
import { StateProp } from "@/src/lib/definition";

type LayoutContextType = {
    sidebarOpen: StateProp<boolean>; // state + setState
};

const AdminPanelContext = createContext<LayoutContextType | undefined>(
    undefined
);

export default function AdminPanelProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const sidebarState = useState(false);
    return (
        <AdminPanelContext.Provider value={{ sidebarOpen: sidebarState }}>
            <div className="h-full flex">
                <div className="">
                    {/* <AdminPanelHeader /> */}
                    <Sidebar
                        
                    />
                </div>
                <div
                    className={`py-8
                     grow transition-all duration-300 ${
                        sidebarState ? "pl-8 pr-8 xl:pr-100" : "pl-8 pr-20"
                    }`}
                >
                    {children}
                </div>
            </div>
        </AdminPanelContext.Provider>
    );
}

export const useAdminPanelContext = () => {
    const context = useContext(AdminPanelContext);
    if (!context)
        throw new Error("useLayout must be used within LayoutProvider");
    return context;
};
