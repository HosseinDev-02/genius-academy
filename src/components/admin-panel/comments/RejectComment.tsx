"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { Toaster, toast } from "sonner";

export default function RejectComment({ commentId }: { commentId: string }) {
    const router = useRouter();
    const rejectCommentHandler = async () => {
        try {
            const response = await fetch(`/api/comments/reject/${commentId}`, {
                method: "PUT",
            });
            const result = await response.json();
            if (result.success) {
                toast.success(result.message);
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
                onClick={rejectCommentHandler}
                size={"sm"}
                variant="ghost"
                type="button"
                className="bg-red-600 text-xs cursor-pointer"
            >
                رد کردن
            </Button>
        </div>
    );
}
