"use client";
import { userProfileItems } from "@/src/lib/placeholder-data";
import {
    LucideChevronDown,
    LucideIcon,
    LucideLogOut,
    LucideSettings,
    LucideSparkle,
    LucideUser,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import RoundButton from "./button/RoundButton";

function setUserProfileItemIcon(title: string): LucideIcon {
    switch (title) {
        case "مشاهده پروفایل":
            return LucideSparkle;
        case "پنل کاربری":
            return LucideLogOut;
        case "خروج از حساب":
            return LucideSettings;
        default:
            return LucideSparkle;
    }
}

export default function UserProfile() {
    const [userProfileShow, setUserProfileShow] = useState(false);

    return (
        <div className="group/profile">
            <button
                type="button"
                onClick={() => setUserProfileShow((prevState) => !prevState)}
                className="flex items-center gap-3 cursor-pointer"
            >
                <RoundButton icon={<LucideUser size={20}/>}></RoundButton>
                <span className="hidden xs:flex flex-col gap-1 items-start text-xs pointer-events-none">
                    <span className="text-title font-YekanBakh-SemiBold">
                        حسین رستمی
                    </span>
                    <span className="font-YekanBakh-SemiBold">
                        خوش آمـــدید
                    </span>
                </span>
               <LucideChevronDown size={20} className={`${userProfileShow && 'rotate-180'} transition-all hidden xs:inline`}/>
            </button>
            {/* header user profile menu */}
            <div
                id="user-profile"
                className={`rounded-xl shadow border border-border absolute top-full left-0 w-56 p-3 flex flex-col bg-background transition-all delay-75 child:transition-colors font-YekanBakh-SemiBold text-xs text-title ${
                    userProfileShow
                        ? "visible opacity-100 z-20"
                        : "invisible opacity-0"
                }`}
            >
                {userProfileItems.map((item) => {
                    const Icon = setUserProfileItemIcon(
                        item.title
                    );
                    return (
                        <Link
                            key={item.id}
                            className={`flex items-center gap-2 py-2 px-3 transition-colors ${item.title === 'خروج از حساب' ? 'hover:text-red-700 text-red-500' : 'hover:text-primary'}`}
                            href={item.href}
                        >
                            <Icon size={20} />
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
