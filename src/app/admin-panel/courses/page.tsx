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
import { MoreHorizontalIcon, PencilIcon, Plus, TrashIcon } from "lucide-react";
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
                            className="bg-zinc-800 border-0 cursor-pointer"
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
        accessorKey: "short_name",
        header: "نام کوتاه",
    },
    {
        accessorKey: "isCompleted",
        header: "وضعیت",
        cell: ({ row }) => {
            const isCompleted = row.getValue("isCompleted");
            return (
                <span
                    className={`px-2 py-1 rounded font-YekanBakh-SemiBold text-xs ${
                        isCompleted ? "bg-green-600" : "bg-yellow-500"
                    }`}
                >
                    {isCompleted ? "تکمیل شده" : "درحال برگزاری"}
                </span>
            );
        },
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
            <PageHeader title="دوره ها" />
            {/* Page Content */}
            <div className="h-full overflow-hidden">
                {/* Course Table Header */}
                <Link
                    href="/admin-panel/courses/add-course"
                    className="col-span-1 inline-flex items-center justify-center gap-2 text-sm h-10 px-3 rounded transition-colors duration-300 bg-teal-800 hover:bg-teal-600 font-YekanBakh-SemiBold text-white cursor-pointer mb-3"
                >
                    <span>افزودن دوره</span>
                    <Plus strokeWidth={"2.5px"} size={16} />
                </Link>
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
