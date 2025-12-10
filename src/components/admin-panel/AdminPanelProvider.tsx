"use client";
import React, { createContext, useContext, useState } from "react";
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
            <div className="h-full overflow-hidden grid grid-rows-[auto_1fr] gap-4 p-3 lg:p-4">
                {/* Admin Panel Header */}
                <div className="content-wrapper h-20 flex flex-row items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <span className="flex lg:hidden items-center justify-center bg-zinc-800 hover:bg-zinc-900 w-10 h-10 rounded-md">
                            <LucideMenu className="shrink-0 text-stone-400" size={24}/>
                        </span>
                        <div className="flex items-center gap-2">
                            <LucideCircleUserRound
                                className="text-teal-700"
                                size={32}
                            />
                            <div className="hidden md:flex flex-col gap-2 items-start font-YekanBakh-Bold">
                                <h6 className="text-sm">حسین رستمی</h6>
                                <span className="text-xs">مدرس</span>
                            </div>
                        </div>
                    </div>
                    <h5 className="hidden sm:block font-YekanBakh-Black text-3xl text-center text-teal-700">
                        <span className="hidden md:inline">پنل مدیریت</span> آکادمی نابغه
                    </h5>
                    <Button
                        className="hidden md:flex hover:text-zinc-950 bg-red-700 hover:bg-red-800 text-sm font-YekanBakh-SemiBold cursor-pointer transition-all duration-300"
                        variant="ghost"
                    >
                        خروج از سیستم
                    </Button>
                    <span className="flex md:hidden items-center justify-center"> 
                        <LucidePower size={24} className={'text-red-700'}/>
                    </span>
                </div>
                {/* Admin Panel Body */}
                <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-12 lg:gap-4 gap-3 overflow-hidden">
                    {/* Admin Panel Sidebar */}
                    <Sidebar className="lg:col-span-3 2xl:col-span-2 h-full" />
                    {/* Admin Panel Content */}
                    <div
                        dir="ltr"
                        className={`content-wrapper flex lg:col-span-9 2xl:col-span-10 transition-all duration-300 overflow-hidden h-full ${
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
