import { StateProp } from "@/src/lib/definition";
import { LucideCircleUserRound, LucideMenu, LucidePower } from "lucide-react";
import React from "react";
import { useAdminPanelContext } from "./AdminPanelProvider";
import { Button } from "@/components/ui/button";

export default function AdminPanelHeader({
    className,
}: {
    className?: string;
}) {
    const { sidebarOpen } = useAdminPanelContext();
    const [isOpen, setIsOpen] = sidebarOpen;
    return (
        <div className="content-wrapper h-20 flex flex-row items-center justify-between px-4">
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
                    <LucideCircleUserRound
                        className="text-teal-700"
                        size={32}
                    />
                    <div className="hidden md:flex flex-col gap-2 items-start font-YekanBakh-Bold">
                        <h6 className="text-sm">حسین رستمی</h6>
                        <span className="text-xs">مدرس</span>
                    </div>
                </div>
            </div>
            <h5 className="hidden sm:block font-YekanBakh-Black text-3xl text-center text-teal-700">
                <span className="hidden md:inline">پنل مدیریت</span> آکادمی
                نابغه
            </h5>
            <Button
                className="hidden md:flex hover:text-zinc-950 bg-red-700 hover:bg-red-800 text-sm font-YekanBakh-SemiBold cursor-pointer transition-all duration-300"
                variant="ghost"
            >
                خروج از سیستم
            </Button>
            <span className="flex md:hidden items-center justify-center">
                <LucidePower size={24} className={"text-red-700"} />
            </span>
        </div>
    );
}
