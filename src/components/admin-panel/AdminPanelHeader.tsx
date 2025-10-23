import { StateProp } from "@/src/lib/definition";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import React from "react";
import { useAdminPanelContext } from "./AdminPanelProvider";

export default function AdminPanelHeader() {
    const { sidebarOpen } = useAdminPanelContext();
    const [isOpen, setIsOpen] = sidebarOpen;
    return (
        <div className="fixed top-0 h-16 border-b border-border right-80 left-0 flex items-center justify-between px-8">
            <div>
                <span
                    onClick={() => setIsOpen((prevState) => !prevState)}
                    className="cursor-pointer flex xl:hidden items-center justify-center rounded bg-indigo-900 w-12 h-12"
                >
                    {isOpen ? (
                        <PanelRightClose size={28} />
                    ) : (
                        <PanelRightOpen size={28} />
                    )}
                </span>
                <h5 className="font-YekanBakh-Black text-2xl text-center">
                    پنل مدیریت
                </h5>
            </div>
        </div>
    );
}
