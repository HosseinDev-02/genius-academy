"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

type Props = {
    commentReplyHandler: () => void;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    setShowContent: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string
};

export default function CommentReplyForm({
    content,
    setContent,
    setShowContent,
    commentReplyHandler,
    className
}: Props) {
    return (
        <div className={`p-4 rounded-2xl bg-zinc-800 fixed inset-0 max-w-xl w-full m-auto max-h-80 h-full z-[1000] flex flex-col ${className}`}>
            <Textarea
                value={content || ""}
                onChange={(e) => setContent(e.target.value)}
                placeholder="متن پاسخ را وارد کنید ..."
                className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600 h-full resize-none focus-visible:h-full text-title"
            />
            <div className="flex gap-2 mt-4">
                <Button
                    onClick={commentReplyHandler}
                    size={"lg"}
                    variant="ghost"
                    type="button"
                    className="bg-zinc-800 text-xs cursor-pointer text-title font-YekanBakh-SemiBold hover:opacity-80 transition-all duration-300"
                >
                    ارسال
                </Button>
                <Button
                    onClick={() => setShowContent(false)}
                    size={"lg"}
                    variant="ghost"
                    type="button"
                    className="bg-zinc-800 text-xs cursor-pointer text-red-500 font-YekanBakh-SemiBold hover:opacity-80 transition-all duration-300"
                >
                    لغو
                </Button>
            </div>
        </div>
    );
}
