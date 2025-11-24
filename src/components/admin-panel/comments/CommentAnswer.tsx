"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Comment, CommentWithRelations } from "@/src/lib/type-definition";
import React, { useState } from "react";
import Cover from "../../shared/Cover";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import CommentReplyForm from "./CommentReplyForm";

export default function CommentAnswer({
    comment,
}: {
    comment: CommentWithRelations;
}) {
    const [showContent, setShowContent] = useState(false);
    const [content, setContent] = useState("");
    const router = useRouter()

    const commentReplyHandler = async () => {
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
            setContent('')
            setShowContent(false)
            router.refresh()
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
                <CommentReplyForm content={content} setContent={setContent} setShowContent={setShowContent} commentReplyHandler={commentReplyHandler}/>
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
