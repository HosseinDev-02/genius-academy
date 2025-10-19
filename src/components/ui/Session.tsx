import { LucideChevronDown } from "lucide-react";
import React from "react";

type TSessionProps = {
    sessionTitle: string;
    sessionIndex: string | number;
    children: React.ReactNode;
};

export default function Session({
    sessionTitle,
    sessionIndex,
    children,
}: TSessionProps) {
    return (
        <div>
            <button
                className={`flex items-center justify-between w-full px-5 h-14 rounded-3xl bg-secondary text-xs font-YekanBakh-SemiBold hover:text-title transition-colors`}
            >
                <div className="flex items-center gap-6">
                    <span className="text-title">{sessionIndex}</span>
                    <span>{sessionTitle}</span>
                </div>
                <LucideChevronDown size={20} />
            </button>
            <div className={`py-3 mx-8`}>
                <ul className="flex flex-col gap-1">{children}</ul>
            </div>
        </div>
    );
}
