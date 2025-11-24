type TSectionLinkBtn = {
    clickEvent?: () => void;
    className?: string;
    href?: string;
    text: string;
    icon: React.ReactNode;
}

export default function SectionLinkBtn({ clickEvent, className, text, icon }: TSectionLinkBtn) {
    return (
        <button type="button" onClick={clickEvent} className={`flex items-center justify-center text-title gap-1 bg-secondary rounded-full w-11 text-sm sm:w-auto sm:px-4 h-11 hover:text-primary transition-colors shrink-0 cursor-pointer ${className}`}>
            <span className='hidden sm:inline-block font-YekanBakh-SemiBold'>
                {text}
            </span>
            <span>
                {icon}
            </span>
        </button>
    )
}