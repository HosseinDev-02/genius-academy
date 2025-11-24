"use client";
import React from "react";
import SectionLinkBtn from "../../ui/section/SectionLinkBtn";
import { LucideCornerUpRight } from "lucide-react";
import CommentReplyForm from "../../admin-panel/comments/CommentReplyForm";
import Cover from "../../shared/Cover";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../layout/LayoutProvider";

export default function CommentReplyButton({
    commentId,
}: {
    commentId: string;
}) {
    const [showContent, setShowContent] = React.useState(false);
    const [content, setContent] = React.useState("");
    const router = useRouter();
    const { user } = useAuthContext();

    const commentReplyHandler = async () => {
        console.log("content :", content);
        console.log("comment Id :", commentId);
        try {
            const response = await fetch("/api/comments/reply", {
                method: "POST",
                body: JSON.stringify({
                    parent_id: commentId,
                    user_id: user?.id,
                    content: content,
                    status: "approved", // 👈 همزمان تغییر وضعیت
                }),
            });

            console.log("response :", response);

            const result = await response.json();

            console.log("result :", result);

            if (result.success) {
                toast.success(result.message);
                setContent("");
                setShowContent(false);
                // revalidateTag("comments");
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
        <div
            className={`items-center gap-3 ${
                user?.role !== "user" ? "flex" : "hidden"
            }`}
        >
            <SectionLinkBtn
                className="h-9 text-xs text-caption"
                icon={<LucideCornerUpRight size={20} />}
                text="پاسخ"
                clickEvent={() => {
                    setShowContent(true);
                }}
            />
            {showContent && (
                <CommentReplyForm
                    className="bg-zinc-900"
                    commentReplyHandler={commentReplyHandler}
                    setShowContent={setShowContent}
                    setContent={setContent}
                    content={content}
                />
            )}

            {showContent && (
                <Cover
                    className="!bg-black/80"
                    setElemStatus={setShowContent}
                />
            )}

            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 2500,
                    classNames: {
                        success: "!bg-teal-700",
                        error: "!bg-red-700",
                    },
                    className: "!text-white !border-none",
                }}
            />
            {/* <LikeButton className="h-9 w-9" count="3" /> */}
        </div>
    );
}
