"use client";
import { DataTable } from "@/src/components/admin-panel/DataTable";
import { Video, VideoWithRelations } from "@/src/lib/type-definition";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect } from "react";
import VideoTableAction from "./VideoTableAction";
import { useMediaQuery } from "usehooks-ts";

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
    const isSmallerMobile = useMediaQuery('(max-width: 480px)')
    const isMobile = useMediaQuery('(max-width: 768px)')
    const isTablet = useMediaQuery('(max-width: 1280px)')

    useEffect(() => {
        if(isSmallerMobile) {
            setColumnVisibility({
                id: false,
                title: true,
                duration: false,
                session: true,
                is_free: false
            })
        }else if(isMobile) {
            setColumnVisibility({
                id: false,
                title: true,
                duration: false,
                session: true,
                is_free: true
            })
        }else if(isTablet) {
            setColumnVisibility({
                id: true,
                title: true,
                duration: false,
                session: true,
                is_free: true
            })  
        }else {
            setColumnVisibility({
                id: true,
                title: true,
                duration: true,
                session: true,
                is_free: true
            })
        }
    }, [isMobile, isSmallerMobile, isTablet])
    return (
        <DataTable
            data={data}
            columns={columns}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
        />
    );
}
