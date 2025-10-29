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
import Link from "next/link";
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const columns: ColumnDef<Course>[] = [
    {
        accessorKey: "actions",
        header: "عملیات",
        cell: ({ row }) => {
            const course = row.original;
            console.log(course);
            return (
                <DropdownMenu dir="rtl" modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="bg-zinc-950 border-0 cursor-pointer"
                            variant="outline"
                            aria-label="Open menu"
                            size="icon-sm"
                        >
                            <MoreHorizontalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40 bg-zinc-800 border-0 transition-all duration-300 *:hover:bg-zinc-700 *:hover:opacity-80">
                        <DropdownMenuItem className="p-3">
                            <Link
                                className="flex items-center justify-start gap-2 text-white"
                                href={`courses/edit/${course.id}`}
                            >
                                <PencilIcon size={18} />
                                <span className="font-YekanBakh-SemiBold text-sm">
                                    ویرایش
                                </span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                console.log(
                                    `Delete Course ( id : ${course.id} ) Row Event :`
                                );
                            }}
                            className="p-3 flex items-center cursor-pointer text-red-600"
                        >
                            <TrashIcon size={18} />
                            <span className="font-YekanBakh-SemiBold text-sm">
                                حذف
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
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
                <span className="block relative w-24 h-12 rounded overflow-hidden">
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
    const isSmallerMobile = useMediaQuery("(max-width: 480px)");
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isTablet = useMediaQuery("(max-width: 1280px)");
    React.useEffect(() => {
        if (isSmallerMobile) {
            // در موبایل فقط name
            setColumnVisibility({
                id: false,
                title: true,
                category: false,
                price: false,
                img: false,
            });
        } else if (isMobile) {
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
        // console.log('Column Visibility :', columnVisibility)
    }, [isMobile, isTablet, isSmallerMobile]);
    return (
        <div className="h-full flex flex-col">
            {/* Page Header */}
            <PageHeader title="دوره ها" href="courses/add-course" />
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
