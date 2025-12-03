"use client";
import React from "react";
import { DataTable } from "../DataTable";
import { useMediaQuery } from "usehooks-ts";
import { Offer, OfferWithRelations } from "@/src/lib/type-definition";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import OfferTableAction from "./OfferTableAction";

const columns: ColumnDef<OfferWithRelations>[] = [
    {
        accessorKey: "actions",
        header: "عملیات",
        cell: ({ row }) => <OfferTableAction offerId={row.original.id}/>
    },
    {
        accessorKey: "id",
        header: "#",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "code",
        header: "کد تخفیف",
    },
    {
        accessorKey: "discount_percent",
        header: "درصد تخفیف",
    },
    {
        accessorKey: "is_active",
        header: "وضعیت",
        cell: ({ row }) => (row.original.is_active ? "فعال" : "غیرفعال"),
    },
    {
        accessorKey: "course",
        header: "دوره",
        cell: ({ row }) => row.original.course.title,
    },
];

export default function OffersTable({
    data,
}: {
    data: OfferWithRelations[];
}) {
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isTablet = useMediaQuery("(max-width: 1280px)");
    return (
        <DataTable
            data={data}
            columns={columns}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
        />
    );
}
