"use client";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import React from "react";
import { Toaster } from "sonner";
import Cover from "../../shared/Cover";

export default function CommentContent({ content }: { content: string }) {
    const [showContent, setShowContent] = React.useState(false);
    return (
        <div>
            <Button
                onClick={() => setShowContent(true)}
                size={"sm"}
                variant="ghost"
                type="button"
                className="bg-gray-600 text-xs cursor-pointer"
            >
                نمایش
            </Button>
            {showContent && (
                <div className="p-4 rounded-2xl bg-zinc-800 fixed inset-0 max-w-lg w-full m-auto max-h-64 h-full z-[1000]">
                    <div className="h-full flex flex-col justify-between">
                        <div className="flex flex-col gap-2 text-center">
                            <span className="font-YekanBakh-SemiBold text-lg">
                                متن کامنت :
                            </span>
                            <p>{content}</p>
                        </div>
                        <Button
                            onClick={() => setShowContent(false)}
                            size={"sm"}
                            type="button"
                            className="bg-red-600 text-xs cursor-pointer hover:bg-red-700 transition-all duration-300"
                        >
                            بستن
                        </Button>
                    </div>
                </div>
            )}
            <Cover
                className={`z-[999] !bg-black/80 ${
                    showContent ? "visible opacity-100" : "invisible opacity-0"
                }`}
                setElemStatus={setShowContent}
            />
        </div>
    );
}
