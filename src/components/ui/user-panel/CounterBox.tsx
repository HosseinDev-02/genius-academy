import React, { JSX } from "react";
import CursorIcon from "../../icon/CursorIcon";
import EducationIcon from "../../icon/EducationIcon";
import { LucideStar } from "lucide-react";
import WalletIcon from "../../icon/WalletIcon";
import { UserCounterItem } from "@/src/lib/definition";

export default function CounterBox(props: UserCounterItem) {
    const boxConfig: Record<string, { color: string; icon: JSX.Element }> = {
        "باقیمانده اشتراک": {
            icon: <CursorIcon className="w-5 h-5" width={20} height={20} />,
            color: "rgb(6, 182, 212)",
        },
        "در حال یادگیری": {
            icon: <EducationIcon width={20} height={20} />,
            color: "rgb(34, 197, 94)",
        },
        امتیازات: {
            icon: <LucideStar size={20} />,
            color: "rgb(234, 179, 8)",
        },
        "موجودی کیف پول": {
            icon: <WalletIcon className="w-5 h-5" width={20} height={20} />,
            color: "rgb(139, 92, 246)",
        },
    };
    const Icon = boxConfig[props.title].icon;
    const color = boxConfig[props.title].color;
    return (
        <div
            key={props.id}
            className="flex items-center gap-3 bg-secondary p-3 rounded-2xl"
        >
            <span
                className="flex items-center justify-center bg-background rounded-full w-12 h-12"
                style={{ color: color }}
            >
                {Icon}
            </span>
            <div className="flex flex-col items-start gap-1">
                <span className="text-xs font-YekanBakh-Bold line-clamp-1">
                    {props.title}
                </span>
                <span className="text-sm font-YekanBakh-Bold text-title line-clamp-1">
                    {props.text}
                </span>
            </div>
        </div>
    );
}
