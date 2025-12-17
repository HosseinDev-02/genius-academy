"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Comment, CommentWithRelations } from "@/src/lib/type-definition";
import React, { useState } from "react";
import Cover from "../../shared/Cover";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import CommentReplyForm from "./CommentReplyForm";
import { useAdminPanelContext } from "../AdminPanelProvider";

export default function CommentAnswer({
    comment,
}: {
    comment: CommentWithRelations;
}) {
    const [showContent, setShowContent] = useState(false);
    const [content, setContent] = useState("");
    const router = useRouter();
    const { user } = useAdminPanelContext();

    const commentReplyHandler = async () => {
        // setShowContent(false);
        try {
            const response = await fetch("/api/comments/reply", {
                method: "POST",
                body: JSON.stringify({
                    parent_id: comment.id,
                    user_id: user?.id,
                    content: content,
                    status: "approved", // 👈 همزمان تغییر وضعیت
                }),
            });
            const result = await response.json();
            if (result.success) {
                toast.success(result.message);
                setContent("");
                setShowContent(false);
                router.refresh();
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "خطایی رخ داد"
            );
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
                <CommentReplyForm
                    cancelBtnClassName="bg-zinc-900"
                    sendBtnClassName="bg-zinc-900 text-white"
                    className="!text-white"
                    content={content}
                    setContent={setContent}
                    setShowContent={setShowContent}
                    commentReplyHandler={commentReplyHandler}
                />
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
