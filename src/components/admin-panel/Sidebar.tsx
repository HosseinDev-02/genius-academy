import Link from "next/link";
import React, { JSX } from "react";
import EducationIcon from "../icon/EducationIcon";
import {
    FileText,
    GraduationCap,
    LinkIcon,
    LucideBookOpen,
    PowerIcon,
    School,
    Shapes,
    ShoppingBag,
    UsersRound,
    WrenchIcon,
} from "lucide-react";
import { adminPanelMenuItems } from "@/src/lib/placeholder-data";

export default function Sidebar() {
    const iconsMap: Record<string, JSX.Element> = {
        courses: <GraduationCap size={24} />,
        articles: <FileText size={24} />,
        categories: <Shapes size={24} />,
        services: <WrenchIcon size={24} />,
        'menu-links': <LinkIcon size={24} />,
        users: <UsersRound size={24} />,
        basket: <ShoppingBag size={24} />,
    };

    return (
        <div className="relative right-0 top-0 bottom-0 bg-gray-100 w-full p-5 h-full">
            {/* Sidebar Header */}
            <div className="pb-5">
                <h5 className="text-primary font-YekanBakh-Black text-2xl text-center">
                    پنل مدیریت
                </h5>
            </div>
            <ul className="flex flex-col gap-3 text-white font-YekanBakh-SemiBold *:bg-indigo-600 *:transition-colors *:cursor-pointer *:w-full *:rounded-2xl *:px-5 *:h-12 *:flex *:items-center *:gap-3">
                {adminPanelMenuItems.map((item) => {
                    const Icon = iconsMap[item.href];
                    return (
                        <Link key={item.id} className="" href={`${item.href}`}>
                            {Icon}
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
                <Link className="!bg-red-600" href='#'>
                    <PowerIcon size={24}/>
                    <span>
                        خروج از سیستم
                    </span>
                </Link>
            </ul>
        </div>
    );
}
