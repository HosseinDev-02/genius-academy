"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Comment, CommentWithRelations } from "@/src/lib/type-definition";
import React, { useState } from "react";
import Cover from "../../shared/Cover";
import { Toaster, toast } from "sonner";

export default function CommentAnswer({
    comment,
}: {
    comment: CommentWithRelations;
}) {
    const [showContent, setShowContent] = useState(false);
    const [content, setContent] = useState("");

    const answerToCommentHandler = async () => {
        console.log("content :", content);
        console.log("answer");
        // setShowContent(false);
        const response = await fetch("/api/comments/reply", {
            method: "POST",
            body: JSON.stringify({
                parent_id: comment.id,
                user_id: "e2a0812c-c8d2-400e-a9cb-5605520ef60b",
                content: content,
                status: "approved", // 👈 همزمان تغییر وضعیت
            }),
        });
        if (response.ok) {
            toast.success("پاسخ با موفقیت ارسال شد");
        }
    };
    return (
        <div>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 2500,
                    classNames: {
                        success: "!bg-teal-700",
                        error: "!bg-red-700",
                    },
                    className: "!text-white !border-none",
                }}
            />
            <Button
                onClick={() => setShowContent(true)}
                size={"sm"}
                variant="ghost"
                type="button"
                className="bg-primary text-xs cursor-pointer"
            >
                پاسخ
            </Button>
            {showContent && (
                <div className="p-4 rounded-2xl bg-zinc-800 fixed inset-0 max-w-xl w-full m-auto max-h-80 h-full z-[1000] flex flex-col">
                    <Textarea
                        value={content || ""}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="متن پاسخ را وارد کنید ..."
                        className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600 h-full resize-none focus-visible:h-full"
                    />
                    <div className="flex gap-4 mt-4">
                        <Button
                            onClick={answerToCommentHandler}
                            size={"lg"}
                            variant="ghost"
                            type="button"
                            className="bg-primary text-xs cursor-pointer"
                        >
                            ارسال
                        </Button>
                        <Button
                            onClick={() => setShowContent(false)}
                            size={"lg"}
                            variant="ghost"
                            type="button"
                            className="bg-stone-600 text-xs cursor-pointer"
                        >
                            لغو
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
