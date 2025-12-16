import { StateProp } from "@/src/lib/definition";
import { LucideCircleUserRound, LucideMenu, LucidePower } from "lucide-react";
import React from "react";
import { useAdminPanelContext } from "./AdminPanelProvider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { User } from "@/src/lib/type-definition";
import Link from "next/link";

export default function AdminPanelHeader({
    className,
    user,
}: {
    className?: string;
    user: User | null;
}) {
    const { sidebarOpen } = useAdminPanelContext();
    const [isOpen, setIsOpen] = sidebarOpen;

    console.log("user :", user);

    return (
        <div className="content-wrapper shadow-[0_0_6px_2px_rgba(0,0,0,0.8)] h-20 flex flex-row items-center justify-between px-4">
            <div className="flex items-center gap-4">
                <span
                    onClick={() => {
                        setIsOpen((prevState) => !prevState);
                    }}
                    className="flex lg:hidden items-center justify-center bg-zinc-800 hover:bg-zinc-900 w-10 h-10 rounded-md cursor-pointer"
                >
                    <LucideMenu className="shrink-0 text-stone-400" size={24} />
                </span>
                <div className="flex items-center gap-2">
                    {/* <LucideCircleUserRound
                        className="text-teal-700"
                        size={32}
                    /> */}
                    <div className="w-12 h-12 overflow-hidden flex items-center justify-center border-3 border-teal-700 rounded-full">
                        <Image
                            className="rounded-full"
                            priority
                            alt="user_image"
                            width={44}
                            height={44}
                            src={"/images/profile.jpeg"}
                        />
                    </div>
                    <div className="hidden md:flex flex-col gap-2 items-start font-YekanBakh-Bold">
                        <h6 className="text-sm">{user?.name}</h6>
                        <span className="text-xs">
                            {user?.role === "admin" ? "مدیر" : "مدرس"}
                        </span>
                    </div>
                </div>
            </div>
            <h5 className="hidden sm:block font-YekanBakh-Black text-3xl text-center text-teal-700">
                <span className="hidden md:inline">پنل مدیریت</span> آکادمی
                نابغه
            </h5>
            <Link
                href="/"
                className="hidden md:flex hover:text-zinc-950 bg-red-700 hover:bg-red-800 text-sm font-YekanBakh-SemiBold cursor-pointer transition-all duration-300 py-2 rounded-md px-4"
            >
                خروج از سیستم
            </Link>
            <span className="flex md:hidden items-center justify-center">
                <LucidePower size={24} className={"text-red-700"} />
            </span>
        </div>
    );
}
