"use client";
import React, { useState } from "react";
import { DataTable } from "../DataTable";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { Menu, SubMenu, SubMenuWithRelations } from "@/src/lib/type-definition";
import SubmenuTableAction from "./SubmenuTableAction";

const columns: ColumnDef<SubMenuWithRelations>[] = [
    {
        accessorKey: "actions",
        header: "عملیات",
        cell: ({ row }) => <SubmenuTableAction submenuId={row.original.id}/>
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
        accessorKey: "menu",
        header: "منو والد",
        cell: ({ row }) => <span dir="ltr">{row.original.menu.title}</span>
    },
    {
        accessorKey: "order_index",
        header: "اولویت",
    },
];
export default function SubmenusTable({ data }: { data: SubMenuWithRelations[] }) {
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
