"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { CommentWithRelations } from "@/src/lib/type-definition";
import { useMediaQuery } from "usehooks-ts";
import CommentTableAction from "./CommentTableAction";
import CommentAnswer from "./CommentAnswer";
import { Toaster, toast } from "sonner";

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
        cell: ({ row }) => (
            <span
                onClick={() => {
                    toast.info(row.original.content);
                }}
                className="px-2 py-1 rounded font-YekanBakh-SemiBold text-xs bg-gray-600 text-white select-none cursor-pointer"
            >
                نمایش
            </span>
        ),
    },
    {
        accessorKey: "status",
        header: "وضعیت",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <span
                    className={`px-2 py-1 rounded font-YekanBakh-SemiBold text-xs ${
                        status === "accepted"
                            ? "bg-green-500"
                            : status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                    }`}
                >
                    {status === "accepted"
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
        accessorKey: "target_type",
        header: "مربوط به",
    },
    {
        accessorKey: "answer",
        header: "پاسخ",
        cell: ({ row }) =>
            !row.original.parent_id && <CommentAnswer comment={row.original} />,
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
                target_type: false,
                status: false,
            });
        } else if (isMobile) {
            onColumnVisibilityChange({
                id: false,
                content: true,
                user: true,
                target_type: false,
                status: false,
            });
        } else if (isTablet) {
            onColumnVisibilityChange({
                id: false,
                content: true,
                user: true,
                target_type: true,
                status: false,
            });
        } else {
            onColumnVisibilityChange({
                id: true,
                content: true,
                user: true,
                target_type: true,
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
                        info: '!bg-sky-700 !text-black'
                    },
                    className: "!text-white !border-none",
                }}
            />
        </div>
    );
}
