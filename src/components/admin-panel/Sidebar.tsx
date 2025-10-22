"use client";
import Link from "next/link";
import React, { JSX, SetStateAction, useState } from "react";
import EducationIcon from "../icon/EducationIcon";
import {
    ChartPie,
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

type SidebarProps = {
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar({ showSidebar, setShowSidebar }: SidebarProps) {
    const pathname = usePathname();

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
            className={`fixed top-0 p-5 bottom-0 w-80 h-full bg-indigo-900 transition-all duration-300 ${
                showSidebar ? "right-0" : "-right-80"
            }`}
        >
            {/* Sidebar Open/Close Button */}
            <span onClick={() => setShowSidebar(prevState => !prevState)} className="cursor-pointer absolute -left-12 top-0 flex items-center justify-center rounded bg-indigo-900 w-12 h-12">
                {showSidebar ? (
                    <PanelRightClose size={28} />
                ) : (
                    <PanelRightOpen size={28} />
                )}
            </span>
            {/* Sidebar Header */}
            <div className="pb-5">
                <h5 className="font-YekanBakh-Black text-2xl text-center">
                    پنل مدیریت
                </h5>
            </div>
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
