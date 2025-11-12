"use client";
import { DataTable } from "@/src/components/admin-panel/DataTable";
import { Video, VideoWithRelations } from "@/src/lib/type-definition";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import VideoTableAction from "./VideoTableAction";

const columns: ColumnDef<VideoWithRelations>[] = [
    {
        accessorKey: "actions",
        header: "عملیات",
        cell: ({ row }) => <VideoTableAction videoId={row.original.id}/>
    },
    {
        accessorKey: "id",
        header: "#",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "title",
        header: "عنوان",
    },
    {
        accessorKey: "duration",
        header: "مدت زمان (ثانیه)",
    },
    {
        accessorKey: "session",
        header: "سرفصل",
        cell: ({ row }) => row.original.session.title,
    },
    {
        accessorKey: "is_free",
        header: "رایگان",
        cell: ({ row }) => (row.getValue("is_free") ? "رایگان" : "اشتراکی"),
    },
];

export default function VideosTable({ data }: { data: VideoWithRelations[] }) {
    const [columnVisibility, setColumnVisibility] = React.useState({});
    return (
        <DataTable
            data={data}
            columns={columns}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
        />
    );
}
