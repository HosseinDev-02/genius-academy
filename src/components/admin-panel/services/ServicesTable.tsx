"use client";
import React, { useEffect } from "react";
import { DataTable } from "../DataTable";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { Service } from "@/src/lib/type-definition";
import { useMediaQuery } from "usehooks-ts";
import ServiceTableAction from "./ServiceTableAction";

const columns: ColumnDef<Service>[] = [
    {
        accessorKey: "actions",
        header: "عملیات",
        cell: ({ row }) => <ServiceTableAction serviceId={row.original.id} />,
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
        accessorKey: "key",
        header: "کلید",
    },
];

export default function ServicesTable({ data }: { data: Service[] }) {
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({
            id: true,
            title: true,
            key: true,
        });
    const isMobile = useMediaQuery("(max-width: 480px)");

    useEffect(() => {
        if (isMobile) {
            setColumnVisibility({
                id: false,
                title: true,
                key: false,
            });
        } else {
            setColumnVisibility({
                id: true,
                title: true,
                key: true,
            });
        }
    }, [isMobile]);
    return (
        <DataTable
            data={data}
            columns={columns}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
        />
    );
}
