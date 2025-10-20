import UserPanelSidebar from "@/src/components/ui/user-panel/UserPanelSidebar";
import React from "react";

export default function UserPanelLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <main className="pt-5">
            <div className="container">
                <div className="md:grid md:grid-cols-12 md:items-start md:gap-5">
                    {/* User Panel Sidebar */}
                    <UserPanelSidebar />
                    <div className="md:col-span-8 lg:col-span-9">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}
