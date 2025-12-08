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
            {/* className : p-3 lg:p-4 grid (grid-rows-12 -> grid-rows-[auto_1fr]) gap-4 h-full */}
            <div className="h-full overflow-hidden grid grid-rows-[auto_1fr] gap-4 p-3 lg:p-4"> 
                {/* Admin Panel Header */}
                <div className="content-wrapper h-20 flex items-center justify-center">
                <h5 className="block font-YekanBakh-Black text-3xl text-center text-teal-700">
                        پنل مدیریت آکادمی نابغه
                    </h5>
                </div>
                {/* Admin Panel Body */}
                {/* ClassName : w-full h-full flex flex-col lg:grid (lg:grid-rows-none -> remove) lg:grid-cols-12 lg:gap-4 gap-3 row-span-10 */}
                <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-12 lg:gap-4 gap-3 overflow-hidden">
                    {/* <AdimnPanelHeader className="" /> */}
                    {/* Admin Panel Sidebar */}
                    <Sidebar className="lg:col-span-3 2xl:col-span-2 h-full" />
                    {/* Admin Panel Content */}
                    {/* ClassName : content-wrapper flex lg:col-span-9 2xl:col-span-10 transition-all duration-300 max-h-screen -> h-full overflow-hidden */}
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
