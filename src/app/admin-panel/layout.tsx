import Sidebar from "@/src/components/admin-panel/Sidebar";
import React from "react";
import "@/src/styles/global.css";
import '@/src/styles/admin-panel.css';
export default function AdminPanelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html dir="rtl" lang="fa">
            <body className="h-screen">
                <div className="grid grid-cols-12 h-full">
                    <div className="col-span-2">
                        <Sidebar />
                    </div>
                    <div className="col-span-10 p-5">{children}</div>
                </div>
            </body>
        </html>
    );
}
