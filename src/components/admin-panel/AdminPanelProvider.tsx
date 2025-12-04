"use client";
import React, { createContext, useContext, useState } from "react";
import Sidebar from "./Sidebar";
import { StateProp } from "@/src/lib/definition";
import AdimnPanelHeader from "./AdminPanelHeader";
import AdminPanelUserSidebar from "./AdminPanelUserSidebar";

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
            <div className="w-full h-full flex flex-col lg:grid lg:grid-rows-none lg:grid-cols-12 lg:gap-4 gap-3 p-3 lg:p-4">
                <AdimnPanelHeader className="" />
                <Sidebar className="lg:col-span-3 2xl:col-span-2" />
                <div
                    dir="ltr"
                    className={`panel-content grow w-full lg:col-span-9 2xl:col-span-8 bg-zinc-900 rounded-4xl transition-all duration-300 p-4 overflow-auto ${
                        sidebarState ? "" : ""
                    }`}
                >
                    {children}
                </div>
                <AdminPanelUserSidebar/>
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
