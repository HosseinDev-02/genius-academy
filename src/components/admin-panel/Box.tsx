import React from "react";

type Box = {
    title: string;
    count: number;
};

export default function Box({ title, count }: Box) {
    return (
        <div className="bg-zinc-800 rounded-2xl p-4 w-full flex flex-col items-center gap-4 justify-center border-2 border-teal-700/40 h-36 text-xl">
            <span className="font-YekanBakh-Bold">{title}</span>
            <span className="font-YekanBakh-SemiBold">{count}</span>
        </div>
    );
}
