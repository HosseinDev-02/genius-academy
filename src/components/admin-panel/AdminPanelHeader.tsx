import { StateProp } from "@/src/lib/definition";
import {
    MenuIcon,
    PanelRightClose,
    PanelRightOpen,
    TextAlignEnd,
} from "lucide-react";
import React from "react";
import { useAdminPanelContext } from "./AdminPanelProvider";

export default function AdminPanelHeader({ className }: { className: string }) {
    const { sidebarOpen } = useAdminPanelContext();
    const [isOpen, setIsOpen] = sidebarOpen;
    return (
        <div
            className={`flex lg:hidden rounded-4xl items-center justify-between bg-zinc-900 p-4 ${className}`}
        >
            <span className="cursor-pointer" onClick={() => setIsOpen((prevState) => !prevState)} title="Toggle Sidebar">
                <TextAlignEnd size={24} />
            </span>
            <h5 className="font-YekanBakh-Black text-2xl text-teal-700">
                پنل مدیریت
            </h5>
            {/* fake elem */}
            <span></span>
        </div>
    );
}
