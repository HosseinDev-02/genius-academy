"use client";
import React, { useState } from "react";
import { DataTable } from "../DataTable";
import {
    ColumnDef,
    ColumnVisibility,
    VisibilityColumn,
    VisibilityState,
} from "@tanstack/react-table";
import { User } from "@/src/lib/type-definition";
import { useMediaQuery } from "usehooks-ts";
import Image from "next/image";
import UserTableAction from "./UserTableAction";

// name
// email
// phone_number
// role
// image

const columns: ColumnDef<User>[] = [
    {
        accessorKey: "actions",
        header: "عملیات",
        cell: ({ row }) => {
            const User = row.original;
            return <UserTableAction userId={User.id} />;
        },
    },
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
        accessorKey: "name",
        header: "نام",
    },
    {
        accessorKey: "email",
        header: "ایمیل",
    },
    {
        accessorKey: "role",
        header: "نقش",
        cell: ({ row }) => {
            const role = row.original.role;
            return (
                (role === "teacher" && "مدرس") ||
                (role === "user" && "کاربر") ||
                (role === "admin" && "ادمین") ||
                (role === "author" && "نویسنده")
            );
        },
    },
    {
        accessorKey: "image",
        header: "تصویر",
        cell: ({ row }) => {
            return (
                <span className="block relative w-20 h-12 rounded overflow-hidden">
                    <Image
                        alt={row.original.name}
                        fill
                        objectFit="cover"
                        src={row.getValue("image")}
                    />
                </span>
            );
        },
    },
];

export default function UsersTable({ data }: { data: User[] }) {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isTablet = useMediaQuery("(max-width: 1280px)");
    React.useEffect(() => {
        if (isMobile) {
            // در موبایل فقط name
            setColumnVisibility({
                id: false,
                name: true,
                email: false,
                role: true,
                image: false,
            });
        } else if (isTablet) {
            // در تبلت name و email
            setColumnVisibility({
                id: true,
                name: true,
                email: true,
                role: true,
                image: false,
            });
        } else {
            // در دسکتاپ همه
            setColumnVisibility({
                id: true,
                name: true,
                email: true,
                role: true,
                image: true,
            });
        }
    }, [isMobile, isTablet]);
    return (
        <DataTable
            columns={columns}
            data={data}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
        />
    );
}
