import Link from "next/link";

type TSectionLinkBtn = {
    clickEvent?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
    href?: string;
    text: string;
    icon: React.ReactNode
}

export default function SectionLinkBtn(props: TSectionLinkBtn) {
    return (
        <Link onClick={props.clickEvent} className={`flex items-center justify-center text-title gap-1 bg-secondary rounded-full w-11 text-sm sm:w-auto sm:px-4 h-11 hover:text-primary transition-colors shrink-0 ${props.className}`}
           href={props.href ? props.href : '#'}>
            <span className='hidden sm:inline-block font-YekanBakh-SemiBold'>
                {props.text}
            </span>
            <span>
                {props.icon}
            </span>
        </Link>
    )
}