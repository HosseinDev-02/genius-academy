"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { SubSubmenu, SubSubmenuWithRelations } from "@/src/lib/type-definition";
import SubSubmenuTableAction from "./SubSubmenuTableAction";
import { useMediaQuery } from "usehooks-ts";

const columns: ColumnDef<SubSubmenuWithRelations>[] = [
    {
        accessorKey: "actions",
        header: "عملیات",
        cell: ({ row }) => (
            <SubSubmenuTableAction subSubmenuId={row.original.id} />
        ),
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
        accessorKey: "url",
        header: "لینک",
        cell: ({ row }) => <span dir="ltr">{row.original.url}</span>,
    },
    {
        accessorKey: "submenu",
        header: "زیرمنو",
        cell: ({ row }) => row.original.submenu.title,
    },
    {
        accessorKey: "order_index",
        header: "اولویت",
    },
];

export default function SubSubmenusTable({
    data,
}: {
    data: SubSubmenuWithRelations[];
}) {
    const [columnVisibility, onColumnVisibilityChange] =
        useState<VisibilityState>({});
    const isSmallerMobile = useMediaQuery("(max-width: 480px)");
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isTablet = useMediaQuery("(max-width: 1280px)");

    useEffect(() => {
        if(isSmallerMobile) {
            onColumnVisibilityChange({
                id: false,
                title: true,
                url: false,
                submenu: false,
                order_index: false,
            })
        }else if(isMobile) {
            onColumnVisibilityChange({
                id: false,
                title: true,
                url: false,
                submenu: true,
                order_index: false,
            })
        }else if(isTablet) {
            onColumnVisibilityChange({
                id: true,
                title: true,
                url: true,
                submenu: true,
                order_index: false,
            })
        }else {
            onColumnVisibilityChange({
                id: true,
                title: true,
                url: true,
                submenu: true,
                order_index: true,
            })
        }
    }, [isMobile, isTablet, isSmallerMobile])
    return (
        <DataTable
            data={data}
            columns={columns}
            onColumnVisibilityChange={onColumnVisibilityChange}
            columnVisibility={columnVisibility}
        />
    );
}
