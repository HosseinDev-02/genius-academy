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
            <div className="h-full w-full grid grid-cols-12 gap-6 p-6">
                <div className="col-span-2">
                    {/* <AdminPanelHeader /> */}
                    <Sidebar
                        
                    />
                </div>
                <div
                    className={`col-span-10 bg-zinc-900 rounded-2xl transition-all duration-300 ${
                        sidebarState ? "" : ""
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
