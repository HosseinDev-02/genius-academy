import { JSX, ReactNode } from "react";
import BookIcon from "../icon/BookIcon";
import CommentsIcon from "../icon/CommentsIcon";
import FireIcon from "../icon/FireIcon";
import PuzzleIcon from "../icon/PuzzleIcon";
import SpeedIcon from "../icon/SpeedIcon";
import VideoIcon from "../icon/VideoIcon";

type TServiceItemProp = {
    title: string;
};

export default function ServiceItem(props: TServiceItemProp) {
    const { title } = props;

    const iconConfig: Record<string, { color: string; icon: JSX.Element }> = {
        "چالش برانگیز": {
            color: "#10b981",
            icon: <PuzzleIcon width={32} height={32} />,
        },
        "پروژه محور": {
            color: "#eab308",
            icon: <FireIcon width={32} height={32} />,
        },
        جامع: { color: "#3b82f6", icon: <BookIcon width={32} height={32} /> },
        "به روز": {
            color: "#22c55e",
            icon: <SpeedIcon width={32} height={32} />,
        },
        ویدیوی: {
            color: "#f43f5e",
            icon: <VideoIcon width={32} height={32} />,
        },
        منتورشیپ: {
            color: "#06b6d4",
            icon: <CommentsIcon width={32} height={32} />,
        },
    };

    const config = iconConfig[title] || {};
    const Icon = config.icon;
    const color = config.color;

    return (
        <div
            style={{ color: color }}
            className="flex items-center flex-col gap-3 animate-pulse"
        >
            <span className="flex items-center justify-center w-20 h-20 rounded-full bg-background">
                {Icon}
            </span>
            <span className="font-semibold text-sm">{title}</span>
        </div>
    );
}
