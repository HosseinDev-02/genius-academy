"use client";
import PageHeader from "@/src/components/admin-panel/PageHeader";
import { courses } from "@/src/lib/placeholder-data";
import React from "react";
import {
    ColumnDef,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "@/src/components/admin-panel/DataTable";
import { Course } from "@/src/lib/definition";
import Image from "next/image";

export const columns: ColumnDef<Course>[] = [
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
            return <span className="block relative w-24 h-12 rounded overflow-hidden justify-self-center">
              <Image alt="image" fill objectFit="cover" src={row.getValue('img')}/>
            </span>;
        },
    },
];

export default function AdminPanelCourses() {
    return (
        <div className="h-full flex flex-col">
            {/* Page Header */}
            <PageHeader title="دوره ها" href="courses/add" />
            {/* Page Content */}
            <div className="h-full overflow-hidden">
                {/* Courses Table */}
                <DataTable data={courses} columns={columns} />
            </div>
        </div>
    );
}
