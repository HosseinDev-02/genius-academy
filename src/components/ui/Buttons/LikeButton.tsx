import { LucideHeart } from "lucide-react";

type TLikeButtonProps = {
    className?: string;
    count?: number | string;
    shadow?: string;
};

export default function LikeButton(props: TLikeButtonProps) {
    return (
        <button
            className={`flex items-center justify-center w-11 h-11 rounded-full bg-secondary shrink-0 hover:text-red-500 transition-colors relative ${
                props.className
            } ${props.shadow && "shadow-xl"}`}
            type="button"
        >
            <LucideHeart fill="currentColor" size={20}/>
            {props.count && (
                <span className="absolute -right-1 -top-1 bg-red-500 w-4 h-4 rounded-full text-xs text-white flex items-center justify-center">
                    {props.count}
                </span>
            )}
        </button>
    );
}
