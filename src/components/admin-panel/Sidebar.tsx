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
    Heading,
    LinkIcon,
    LucideBookOpen,
    Mails,
    MonitorPlay,
    PanelRightClose,
    PanelRightOpen,
    PowerIcon,
    School,
    Shapes,
    ShoppingBag,
    UsersRound,
    Video,
    WrenchIcon,
    XIcon,
    TicketPercent,
} from "lucide-react";
import { adminPanelMenuItems } from "@/src/lib/placeholder-data";
import { usePathname } from "next/navigation";
import { useAdminPanelContext } from "./AdminPanelProvider";
import Cover from "../shared/Cover";
import CommentsIcon from "../icon/CommentsIcon";

type SidebarProps = {
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar({ className }: { className: string }) {
    const pathname = usePathname();
    const { sidebarOpen } = useAdminPanelContext();
    const [isOpen, setIsOpen] = sidebarOpen;

    const iconsMap: Record<string, JSX.Element> = {
        "/counter": <ChartPie size={24} />,
        "/courses": <GraduationCap size={24} />,
        "/articles": <FileText size={24} />,
        "/categories": <Shapes size={24} />,
        "/services": <WrenchIcon size={24} />,
        "/menus": <LinkIcon size={24} />,
        "/submenus": <LinkIcon size={24} />,
        "/sub-submenus": <LinkIcon size={24} />,
        "/users": <UsersRound size={24} />,
        "/comments": <Mails size={24} />,
        "/sessions": <Heading size={24} />,
        "/videos": <MonitorPlay size={24} />,
        "/offers": <TicketPercent size={24} />,
    };

    return (
        <>
            <div
                className={`content-wrapper transition-all duration-300 lg:rounded-2xl rounded-l-2xl fixed lg:static z-50 top-0 bottom-0 w-64 lg:w-full overflow-hidden flex flex-col ${
                    isOpen ? "right-0" : "-right-64"
                } ${className}`}
            >
                {/* Sidebar Header */}
                {/* <div className="flex items-center lg:justify-center justify-between border-b border-teal-800 py-4 px-2">
                    <h5 className="block font-YekanBakh-Black text-2xl text-center text-teal-700">
                        پنل مدیریت
                    </h5>
                    <span
                        onClick={() => setIsOpen(false)}
                        className="block lg:hidden"
                    >
                        <XIcon size={20} />
                    </span>
                </div> */}
                {/* Sidebar Menu */}
                <div
                    dir="ltr"
                    className="sidebar-content overflow-y-auto h-full"
                >
                    <ul className="flex flex-col gap-3 font-YekanBakh-SemiBold text-white h-fit *:rounded-md my-4 px-2 *:transition-colors *:duration-300 *:cursor-pointer *:w-full *:px-2 *:shrink-0 *:h-12 *:flex *:flex-row-reverse *:items-center *:justify-start *:gap-3">
                        {adminPanelMenuItems.map((item) => {
                            const Icon = iconsMap[item.href];
                            return (
                                <Link
                                    key={item.id}
                                    className={`hover:bg-teal-600 ${
                                        pathname.includes(item.href)
                                            ? "bg-teal-800"
                                            : ""
                                    } `}
                                    href={`/admin-panel/${item.href}`}
                                >
                                    {Icon}
                                    <span>{item.title}</span>
                                </Link>
                            );
                        })}
                    </ul>
                </div>
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
