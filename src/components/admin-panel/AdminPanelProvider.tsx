"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { StateProp } from "@/src/lib/definition";
import AdimnPanelHeader from "./AdminPanelHeader";
import AdminPanelUserSidebar from "./AdminPanelUserSidebar";
import Image from "next/image";
import {
    CircleUserRound,
    LucideChevronDown,
    LucideCircleUserRound,
    LucideMenu,
    LucidePower,
    LucidePowerOff,
    LucideUser,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminPanelHeader from "./AdminPanelHeader";
import { User } from "@/src/lib/type-definition";

type LayoutContextType = {
    sidebarOpen: StateProp<boolean>; // state + setState;
    user: User | null
};

const AdminPanelContext = createContext<LayoutContextType | undefined>(
    undefined
);

export default function AdminPanelProvider({
    children,
    user
}: {
    children: React.ReactNode;
    user: User
}) {

    const sidebarState = useState(false);

    return (
        <AdminPanelContext.Provider value={{ sidebarOpen: sidebarState, user: user }}>
            <div className="h-full overflow-hidden grid grid-rows-[auto_1fr] p-3">
                {/* Admin Panel Header */}
                <div className="w-full h-full p-3">
                    <AdminPanelHeader user={user}/>
                </div>
                {/* Admin Panel Body */}
                <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-12 gap-6 overflow-hidden p-3">
                    {/* Admin Panel Sidebar */}
                    <Sidebar className="lg:col-span-3 2xl:col-span-2 h-full" />
                    {/* Admin Panel Content */}
                    <div
                        dir="ltr"
                        className={`content-wrapper shadow-[0_0_6px_2px_rgba(0,0,0,0.8)] flex lg:col-span-9 2xl:col-span-10 transition-all duration-300 overflow-hidden h-full ${
                            sidebarState ? "" : ""
                        }`}
                    >
                        <div
                            dir="rtl"
                            className="overflow-y-auto w-full h-full p-4 panel-content"
                        >
                            {children}
                        </div>
                    </div>
                    {/* <AdminPanelUserSidebar/> */}
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
