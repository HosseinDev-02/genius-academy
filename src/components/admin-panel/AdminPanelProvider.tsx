'use client';
import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default function AdminPanelProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showSidebar, setShowSidebar] = useState(true)
    return (
        <div className="h-full flex">
            <div className="">
                <Sidebar  showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
            </div>
            <div className={`py-5 grow transition-all duration-300 ${showSidebar ? 'pl-8 pr-100' : 'pl-8 pr-20'}`}>{children}</div>
        </div>
    );
}
