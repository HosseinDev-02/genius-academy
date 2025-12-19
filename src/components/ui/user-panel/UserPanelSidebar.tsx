"use client";
import { userPanelMenuLinks } from "@/src/lib/placeholder-data";
import Link from "next/link";
import React, { ComponentType, SVGProps } from "react";
import {
    LucideHeart,
    LucideIcon,
    LucideLogOut,
    LucidePencil,
} from "lucide-react";
import CounterIcon from "../../icon/CounterIcon";
import EducationIcon from "../../icon/EducationIcon";
import NotificationIcon from "../../icon/NotificationIcon";
import CommentsOutlineIcon from "../../icon/CommentsOutlineIcon";
import WalletIcon from "../../icon/WalletIcon";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthContext } from "../../layout/LayoutProvider";
import { Toaster, toast } from "sonner";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export default function UserPanelSidebar() {
    const pathname = usePathname();
    const { logout } = useAuthContext();
    console.log("pathname :", pathname);
    const iconsMap: Record<string, IconType> = {
        counter: CounterIcon,
        courses: EducationIcon,
        edit: LucidePencil,
        questions: CommentsOutlineIcon,
    };

    const logOutHandler = async (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        try {
            const response = await logout();
            console.log("response :", response);
            if (response.success) {
                toast.success(response.message);
                window.location.href = "/login";
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "هنگام خروج از سایت خطایی رخ داد"
            );
        }
    };

    return (
        <div className="md:col-span-4 lg:col-span-3 mb-5 md:mb-0">
            <div className="">
                <div className="flex items-center gap-3">
                    <span className="block overflow-hidden w-10 h-10 rounded-full shrink-0 relative">
                        <Image
                            className="w-full h-full"
                            src="/images/profile.jpeg"
                            alt="User Profile Image"
                            fill
                            sizes="100%"
                            priority
                        />
                    </span>
                    <div className="flex flex-col gap-1 text-xs font-YekanBakh-SemiBold">
                        <span className="line-clamp-1 text-xs">خوش آمدید</span>
                        <span className="line-clamp-1 font-YekanBakh-Bold text-sm">
                            حسین رستمی
                        </span>
                    </div>
                </div>
                <ul className="flex flex-col gap-3 bg-secondary rounded-2xl p-5 mt-5">
                    {/* active class dashboard__item--active */}
                    {userPanelMenuLinks.map((link) => {
                        const Icon = iconsMap[link.href];
                        return (
                            <Link
                                key={link.id}
                                href={`/user-panel/${link.href}`}
                                className={`flex items-center gap-3 rounded-full px-5 bg-background hover:bg-primary hover:text-white transition-colors w-full h-11 cursor-pointer ${
                                    pathname.includes(link.href) &&
                                    "dashboard__item--active"
                                }`}
                            >
                                <Icon className="w-5 h-5 size-5" />
                                <span className="text-xs font-YekanBakh-SemiBold line-clamp-1">
                                    {link.title}
                                </span>
                            </Link>
                        );
                    })}
                    <Link
                        onClick={(e) => {
                            logOutHandler(e);
                        }}
                        href="/login"
                        className="flex items-center gap-3 rounded-full px-5 bg-background hover:bg-red-500 text-red-500 hover:text-white transition-colors w-full h-11 cursor-pointer"
                    >
                        <LucideLogOut size={20} />
                        <span className="text-xs font-YekanBakh-SemiBold line-clamp-1">
                            خروج از حساب
                        </span>
                    </Link>
                </ul>
            </div>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 2500,
                    classNames: {
                        success: "!bg-teal-700",
                        error: "!bg-red-700",
                    },
                    className: "!text-white !border-none",
                }}
            />
        </div>
    );
}
