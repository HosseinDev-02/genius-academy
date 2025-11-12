"use client";
import { SessionWithRelations } from "@/src/lib/type-definition";
import React from "react";
import { DataTable } from "../DataTable";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import SessionTableAction from "./SessionTableAction";

const columns: ColumnDef<SessionWithRelations>[] = [
    {
        accessorKey: "actions",
        header: "عملیات",
        cell: ({ row }) => <SessionTableAction sessionId={row.original.id}/>
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
        accessorKey: "description",
        header: "توضیحات",
    },
    {
        accessorKey: "course",
        header: "دوره",
        cell: ({ row }) => row.original.course.title,
    },
];

export default function SessionsTable({
    data,
}: {
    data: SessionWithRelations[];
}) {
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    return (
        <DataTable
            columns={columns}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
            data={data}
        />
    );
}
