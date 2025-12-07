"use client";
import React from "react";
import { DataTable } from "../DataTable";
import { useMediaQuery } from "usehooks-ts";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import CourseTableAction from "./CourseTableAction";
import { CourseWithRelations } from "@/src/lib/type-definition";

type Category = {
    id: string;
    title: string;
    short_name: string;
};

type User = {
    id: string;
    name: string;
    role: string;
    image: string;
};

type Course = {
    id: string;
    title: string;
    category: Category;
    price: number;
    image?: any;
    user: User;
    short_name: string;
    is_completed: boolean;
    created_at: Date;
    updated_at: Date;
    content: any;
    about: string;
};

const columns: ColumnDef<CourseWithRelations>[] = [
    {
        accessorKey: "actions",
        header: "عملیات",
        cell: ({ row }) => <CourseTableAction courseId={row.original.id} />,
    },
    {
        accessorKey: "id",
        header: "#",
        cell: ({ row }) => {
            row.index + 1;
        },
    },
    {
        accessorKey: "title",
        header: "عنوان",
    },
    {
        accessorKey: "category",
        header: "دسته بندی",
        cell: ({ row }) => row.original.category.title,
    },
    {
        accessorKey: "price",
        header: "قیمت",
        cell: ({ row }) => {
            const price = Number(row.original.price);
            return price.toLocaleString();
        },
    },
    {
        accessorKey: "short_name",
        header: "نام کوتاه",
    },
    {
        accessorKey: "is_completed",
        header: "وضعیت",
        cell: ({ row }) => {
            const isCompleted = row.getValue("is_completed");
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
        accessorKey: "image",
        header: "تصویر",
        cell: ({ row }) => {
            return (
                <span className="block relative w-24 h-12 rounded overflow-hidden">
                    <Image
                        sizes="100%"
                        alt="img"
                        fill
                        src={row.getValue("image")}
                        priority
                    />
                </span>
            );
        },
    },
];

export default function CoursesTable({ data }: { data: CourseWithRelations[] }) {
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
                image: false,
                is_completed: false,
                short_name: false,
            });
        } else if (isMobile) {
            // در موبایل فقط name
            setColumnVisibility({
                id: true,
                title: true,
                category: false,
                price: false,
                image: false,
                is_completed: false,
                short_name: false,
            });
        } else if (isTablet) {
            // در تبلت name و email
            setColumnVisibility({
                id: true,
                title: true,
                category: true,
                price: true,
                image: true,
                is_completed: false,
                short_name: false,
            });
        } else {
            // در دسکتاپ همه
            setColumnVisibility({
                id: true,
                title: true,
                category: true,
                price: true,
                image: true,
                is_completed: true,
                short_name: true,
            });
        }
    }, [isMobile, isTablet, isSmallerMobile]);

    return (
        <DataTable
            data={data}
            columns={columns}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility as any}
        />
    );
}
