"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { CommentWithRelations } from "@/src/lib/type-definition";
import { useMediaQuery } from "usehooks-ts";
import CommentTableAction from "./CommentTableAction";
import CommentAnswer from "./CommentAnswer";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import RejectComment from "./RejectComment";
import CommentContent from "./CommentContent";

const columns: ColumnDef<CommentWithRelations>[] = [
    {
        accessorKey: "actions",
        header: "عملیات",
        cell: ({ row }) => <CommentTableAction commentId={row.original.id} />,
    },
    {
        accessorKey: "id",
        header: "#",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "content",
        header: "متن",
        cell: ({ row }) => (<CommentContent content={row.original.content}/>),
    },
    {
        accessorKey: "status",
        header: "وضعیت",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <span
                    className={`px-2 py-1 rounded font-YekanBakh-SemiBold text-xs ${
                        status === "approved"
                            ? "bg-green-500"
                            : status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                    }`}
                >
                    {status === "approved"
                        ? "قبول شده"
                        : status === "pending"
                        ? "در انتظار"
                        : "رد شده"}
                </span>
            );
        },
    },
    {
        accessorKey: "user",
        header: "کاربر",
        cell: ({ row }) => row.original.user.name,
    },
    {
        accessorKey: "course/article",
        header: "دوره / مقاله",
        cell: ({ row }) => {
            const courseName = row.original.course?.short_name;
            const articleName = row.original.article?.short_name;
            return (
                <span className={`px-2 py-1 rounded font-YekanBakh-SemiBold text-xs ${courseName ? 'bg-blue-500' : 'bg-indigo-500'}`}>{courseName || articleName}</span>
            )
        }
    },
    {
        accessorKey: "parent_user",
        header: "ارسال کننده",
        cell: ({ row }) => row.original.parent_user.name
    },
    {
        accessorKey: "approved-rejected",
        header: "پاسخ",
        cell: ({ row }) =>
            row.original.status === 'pending' && <div className="flex gap-2">
                <CommentAnswer comment={row.original} />
                <RejectComment commentId={row.original.id}/>
            </div>,
    },
];

export default function CommentsTable({
    data,
}: {
    data: CommentWithRelations[];
}) {
    const [columnVisibility, onColumnVisibilityChange] =
        useState<VisibilityState>({});
    const isSmallerMobile = useMediaQuery("(max-width: 480px)");
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isTablet = useMediaQuery("(max-width: 1280px)");

    useEffect(() => {
        if (isSmallerMobile) {
            onColumnVisibilityChange({
                id: false,
                content: true,
                user: false,
                course_id: false,
                'course/article': false,
                parent_user: false,
                status: false,
            });
        } else if (isMobile) {
            onColumnVisibilityChange({
                id: false,
                content: true,
                user: true,
                'course/article': false,
                parent_user: false,
                status: false,
            });
        } else if (isTablet) {
            onColumnVisibilityChange({
                id: false,
                content: true,
                user: true,
                'course/article': true,
                parent_user: false,
                status: false,
            });
        } else {
            onColumnVisibilityChange({
                id: false,
                content: true,
                user: true,
                'course/article': true,
                parent_user: true,
                status: true,
            });
        }
    }, [isSmallerMobile, isMobile, isTablet]);

    return (
        <div>
            <DataTable
                columns={columns}
                onColumnVisibilityChange={onColumnVisibilityChange}
                columnVisibility={columnVisibility}
                data={data}
            />
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 5000,
                    classNames: {
                        success: "!bg-teal-700",
                        error: "!bg-red-700",
                        info: "!bg-sky-700 !text-black",
                    },
                    className: "!text-white !border-none",
                }}
            />
        </div>
    );
}
