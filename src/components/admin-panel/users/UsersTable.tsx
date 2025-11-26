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
import { getRandomAvatar } from "@/src/lib/storage/avatars";

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
        cell: ({ row }) => row.original.email || '-----------'
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
                <span className="block relative w-14 h-14 rounded-full overflow-hidden">
                    {row.getValue("image") ? (
                        <Image
                            alt={row.original.name}
                            fill
                            sizes="100%"
                            src={row.getValue("image")}
                            priority
                        />
                    ) : (
                        <Image
                            alt={row.original.name}
                            fill
                            sizes="100%"
                            src={'/images/avatars/man.png'}
                            priority
                        />
                    )}
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
