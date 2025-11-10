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
    XIcon,
} from "lucide-react";
import { adminPanelMenuItems } from "@/src/lib/placeholder-data";
import { usePathname } from "next/navigation";
import { useAdminPanelContext } from "./AdminPanelProvider";
import Cover from "../shared/Cover";

type SidebarProps = {
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar({ className }: { className: string }) {
    const pathname = usePathname();
    const { sidebarOpen } = useAdminPanelContext();
    const [isOpen, setIsOpen] = sidebarOpen;

    const iconsMap: Record<string, JSX.Element> = {
        "/admin-panel": <ChartPie size={24} />,
        "/admin-panel/courses": <GraduationCap size={24} />,
        "/admin-panel/articles": <FileText size={24} />,
        "/admin-panel/categories": <Shapes size={24} />,
        "/admin-panel/services": <WrenchIcon size={24} />,
        "/admin-panel/menus": <LinkIcon size={24} />,
        "/admin-panel/submenus": <LinkIcon size={24} />,
        "/admin-panel/sub-submenus": <LinkIcon size={24} />,
        "/admin-panel/users": <UsersRound size={24} />,
        "/admin-panel/basket": <ShoppingBag size={24} />,
    };

    return (
        <>
            <div
                className={`px-2 bg-zinc-900 transition-all duration-300 h-full lg:rounded-2xl rounded-l-2xl fixed lg:static z-50 top-0 bottom-0 w-64 lg:w-full ${
                    isOpen ? "right-0" : "-right-64"
                } ${className}`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center lg:justify-center justify-between border-b border-teal-800 py-4 px-2">
                    <h5 className="block font-YekanBakh-Black text-2xl text-center text-teal-700">
                        پنل مدیریت
                    </h5>
                    <span
                        onClick={() => setIsOpen(false)}
                        className="block lg:hidden"
                    >
                        <XIcon size={20} />
                    </span>
                </div>
                {/* Sidebar Menu */}
                <ul className="flex flex-col gap-3 font-YekanBakh-SemiBold text-white *:rounded-md mt-4 *:transition-colors *:duration-300 *:cursor-pointer *:w-full *:px-2 *:h-12 *:flex *:items-center *:gap-3">
                    {adminPanelMenuItems.map((item) => {
                        const Icon = iconsMap[item.href];
                        return (
                            <Link
                                key={item.id}
                                className={`${
                                    pathname === item.href ? "bg-teal-800" : ""
                                } hover:bg-teal-600`}
                                href={item.href}
                            >
                                {Icon}
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}
                    <Link className="text-red-600 hover:opacity-80" href="/">
                        <PowerIcon size={24} />
                        <span>خروج از سیستم</span>
                    </Link>
                </ul>
            </div>
            <Cover
                setElemStatus={setIsOpen}
                className={`z-40 bg-zinc-900/80 ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            />
        </>
    );
}
