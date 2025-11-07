"use client";
import { Category } from "@/src/lib/type-definition";
import React from "react";
import { DataTable } from "../DataTable";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { useMediaQuery } from "usehooks-ts";

const columns: ColumnDef<Category>[] = [
    // {
    //     accessorKey: "actions",
    //     header: "عملیات",
    //     cell: ({ row }) => {
    //         const course = row.original;
    //         return (<CourseTableAction courseId={course.id} />);
    //     },
    // },
    {
        accessorKey: "id",
        header: "#",
        cell: ({ row }) => {
            return (
                <span className="font-YekanBakh-SemiBold text-sm">
                    {row.index + 1}
                </span>
            );
        },
    },
    {
        accessorKey: "title",
        header: "عنوان",
    },
    {
        accessorKey: "short_name",
        header: "نام کوتاه",
    },
];

export default function CategoriesTable({ data }: { data: Category[] }) {
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isTablet = useMediaQuery("(max-width: 1280px)");
    React.useEffect(() => {
        if (isMobile) {
            // در موبایل فقط name
            setColumnVisibility({
                id: true,
                title: true,
                short_name: false,
            });
        } else if (isTablet) {
            // در تبلت name و email
            setColumnVisibility({
                id: true,
                title: true,
                short_name: true,
            });
        } else {
            // در دسکتاپ همه
            setColumnVisibility({
                id: true,
                title: true,
                short_name: true,
            });
        }
        // console.log('Column Visibility :', columnVisibility)
    }, [isMobile, isTablet]);
    return (
        <DataTable
            data={data}
            columns={columns}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility as any}
        />
    );
}
