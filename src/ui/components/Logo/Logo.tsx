import Link from "next/link";
import LogoIcon from "../Icon/LogoIcon";

export default function Logo(prop: { className?: string }) {
    const { className } = prop
    return (
        <Link className={`flex items-center gap-2 ${className}`} href="/">
            <LogoIcon width={24} height={24} className="text-primary"/>
            <span className="flex items-start flex-col">
                <span className="text-sm font-YekanBakh-SemiBold">
                    آکــــادمـــی
                </span>
                <span className="text-primary text-xl font-YekanBakh-Black">
                    نـــابــــغه
                </span>
            </span>
        </Link>
    );
}