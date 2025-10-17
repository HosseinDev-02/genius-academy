import Link from "next/link";

type TPrimaryButtonProps = {
    title: string;
    href?: string;
    icon?: React.ReactNode;
    className?: string;
    clickEvent?: () => {};
};

export default function PrimaryButton(props: TPrimaryButtonProps) {
    const { title, href, icon, className, clickEvent } = props;

    return (
        <Link
            href={href ? href : "#"}
            onClick={clickEvent}
            className={`flex sm:inline-flex items-center justify-center gap-2 bg-primary rounded-full text-white h-11 transition-opacity hover:opacity-80 font-YekanBakh-SemiBold text-xs xl:text-sm px-4 flex-grow ${className}`}
        >
            <span>{title}</span>
            {icon && (
                icon
            )}
        </Link>
    );
}
