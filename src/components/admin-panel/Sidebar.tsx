"use client";
import Link from "next/link";
import React, { JSX, SetStateAction, useState } from "react";
import EducationIcon from "../icon/EducationIcon";
import {
    ChartPie,
    ChevronLeft,
    ChevronRight,
    FileText,
    GraduationCap,
    LinkIcon,
    LucideBookOpen,
    PanelRightClose,
    PanelRightOpen,
    PowerIcon,
    School,
    Shapes,
    ShoppingBag,
    UsersRound,
    WrenchIcon,
} from "lucide-react";
import { adminPanelMenuItems } from "@/src/lib/placeholder-data";
import { usePathname } from "next/navigation";
import { useAdminPanelContext } from "./AdminPanelProvider";

type SidebarProps = {
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar() {
    const pathname = usePathname();
    const { sidebarOpen } = useAdminPanelContext()
    const [isOpen, setIsOpen] = sidebarOpen

    console.log("pathname :", pathname);

    const iconsMap: Record<string, JSX.Element> = {
        "/admin-panel": <ChartPie size={24} />,
        "/admin-panel/courses": <GraduationCap size={24} />,
        "/admin-panel/articles": <FileText size={24} />,
        "/admin-panel/categories": <Shapes size={24} />,
        "/admin-panel/services": <WrenchIcon size={24} />,
        "/admin-panel/menu-links": <LinkIcon size={24} />,
        "/admin-panel/users": <UsersRound size={24} />,
        "/admin-panel/basket": <ShoppingBag size={24} />,
    };

    return (
        <div
            className={`fixed -right-80 xl:right-0 top-0 p-5 bottom-0 w-80 h-full bg-indigo-900 transition-all duration-300`}
        >
            {/* Sidebar Open/Close Button */}
            <span
                onClick={() => setIsOpen((prevState) => !prevState)}
                className="w-8 h-8 rounded-l-xl bg-primary text-white hidden xl:flex items-center text-xl justify-center absolute -left-8 top-4 z-[1001]"
            >
                {isOpen ? (
                    <ChevronLeft size={20} />
                ) : (
                    <ChevronRight size={20} />
                )}
            </span>
            {/* Sidebar Header */}
            <h5 className="font-YekanBakh-Black text-2xl text-center mb-5">
                    پنل مدیریت
                </h5>
            {/* Sidebar Menu */}
            <ul className="flex flex-col gap-1 text-white font-YekanBakh-SemiBold *:rounded-md *:hover:bg-indigo-950 *:transition-colors *:duration-300 *:cursor-pointer *:w-full *:px-5 *:h-14 *:flex *:items-center *:gap-3">
                {adminPanelMenuItems.map((item) => {
                    const Icon = iconsMap[item.href];
                    return (
                        <Link
                            key={item.id}
                            className={
                                pathname === item.href ? "bg-indigo-950" : ""
                            }
                            href={item.href}
                        >
                            {Icon}
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
                <Link className="text-red-600" href="/">
                    <PowerIcon size={24} />
                    <span>خروج از سیستم</span>
                </Link>
            </ul>
        </div>
    );
}
