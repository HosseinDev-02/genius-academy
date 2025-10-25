"use client";
import PageHeader from "@/src/components/admin-panel/PageHeader";
import { courses } from "@/src/lib/placeholder-data";
import React, { useState } from "react";
import {
    ColumnDef,
    OnChangeFn,
    Updater,
    VisibilityState,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "@/src/components/admin-panel/DataTable";
import { Course } from "@/src/lib/definition";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";

const columns: ColumnDef<Course>[] = [
    {
        accessorKey: "id",
        header: "#",
    },
    {
        accessorKey: "title",
        header: "عنوان",
    },
    {
        accessorKey: "category",
        header: "دسته بندی",
    },
    {
        accessorKey: "price",
        header: "قیمت",
    },
    {
        accessorKey: "img",
        header: "تصویر",
        cell: ({ row }) => {
            return (
                <span className="block relative w-24 h-12 rounded overflow-hidden justify-self-center">
                    <Image
                        alt="img"
                        fill
                        objectFit="cover"
                        src={row.getValue("img")}
                    />
                </span>
            );
        },
    },
];

export default function AdminPanelCourses() {
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
                category: false,
                price: false,
                img: false,
            });
        } else if (isTablet) {
            // در تبلت name و email
            setColumnVisibility({
                id: true,
                title: true,
                category: true,
                price: true,
                img: true,
            });
        } else {
            // در دسکتاپ همه
            setColumnVisibility({
                id: true,
                title: true,
                category: true,
                price: true,
                img: true,
            });
        }
        console.log('Column Visibility :', columnVisibility)
    }, [isMobile, isTablet]);
    return (
        <div className="h-full flex flex-col rounded-md border-2 border-indigo-50">
            {/* Page Header */}
            <PageHeader title="دوره ها" href="courses/add" />
            {/* Page Content */}
            <div className="h-full overflow-hidden">
                {/* Courses Table */}
                {courses.length !== 0 && (
                    <DataTable
                        data={courses}
                        columns={columns}
                        columnVisibility={columnVisibility}
                        onColumnVisibilityChange={setColumnVisibility as any}
                    />
                )}
            </div>
        </div>
    );
}
