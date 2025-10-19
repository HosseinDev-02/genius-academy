import Link from "next/link";

type TRoundButtonProp = {
    link?: string;
    className?: string;
    href?: string;
    icon?: React.ReactNode;
    count?: string | number;
    clickEvent?: () => void;
};

export default function RoundButton({
    className,
    href,
    icon,
    count,
    clickEvent,
}: TRoundButtonProp) {
    return href ? (
        <Link
            className={`flex items-center justify-center rounded-full bg-secondary text-title w-10 h-10 relative ${className}`}
            href={href}
        >
            {icon}
            {count && (
                <>
                    <span className="absolute -left-1 -top-1 bg-primary flex items-center justify-center rounded-full w-5 h-5 font-YekanBakh-SemiBold text-white text-xs">
                        {count}
                    </span>
                    <span className="animate-ping absolute -left-1 -top-1 bg-primary w-5 h-5 rounded-full"></span>
                </>
            )}
        </Link>
    ) : (
        <span
            onClick={clickEvent}
            className={`flex items-center justify-center rounded-full bg-secondary text-title w-10 h-10 ${className}`}
        >
            {icon}
        </span>
    );
}
