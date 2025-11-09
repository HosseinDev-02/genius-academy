"use client";
import React, { useState } from "react";
import { DataTable } from "../DataTable";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { Menu } from "@/src/lib/type-definition";
import MenuItemTableAction from "./MenuTableAction";

const columns: ColumnDef<Menu>[] = [
    {
        accessorKey: "actions",
        header: "عملیات",
        cell: ({ row }) => <MenuItemTableAction menuId={row.original.id}/>
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
        cell: ({ row }) => <span dir="ltr">{row.original.url}</span>
    },
    {
        accessorKey: "order_index",
        header: "اولویت",
    },
];
export default function MenuItemsTable({ data }: { data: Menu[] }) {
    const [columnVisibility, onColumnVisibilityChange] =
        useState<VisibilityState>({});
    return (
        <DataTable
            columns={columns}
            data={data}
            onColumnVisibilityChange={onColumnVisibilityChange}
            columnVisibility={columnVisibility}
        />
    );
}
