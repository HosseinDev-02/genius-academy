import Sidebar from "@/src/components/admin-panel/Sidebar";
import React from "react";
import "@/src/styles/global.css";
import '@/src/styles/admin-panel.css';
import AdminPanelProvider from "@/src/components/admin-panel/AdminPanelProvider";
export default function AdminPanelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html dir="rtl" lang="fa">
            <body className="h-screen bg-zinc-800 text-white font-YekanBakh-Regular">
                <AdminPanelProvider>
                    {children}
                </AdminPanelProvider>
            </body>
        </html>
    );
}
