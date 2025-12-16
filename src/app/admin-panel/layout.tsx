import Sidebar from "@/src/components/admin-panel/Sidebar";
import React from "react";
import "@/src/styles/global.css";
import "@/src/styles/admin-panel.css";
import AdminPanelProvider from "@/src/components/admin-panel/AdminPanelProvider";
import { getMe } from "@/src/lib/storage/me";
import { notFound } from "next/navigation";
export default async function AdminPanelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getMe();
    // console.log(user);

    if (!user) notFound();
    return (
        <html dir="rtl" lang="fa">
            <body className="h-screen overflow-hidden bg-zinc-800 text-white font-YekanBakh-Regular">
                <AdminPanelProvider user={user}>{children}</AdminPanelProvider>
            </body>
        </html>
    );
}
