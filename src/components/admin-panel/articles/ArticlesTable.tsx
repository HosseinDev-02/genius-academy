"use client";
import {
    Article,
    ArticleWithRelations,
    Category,
} from "@/src/lib/type-definition";
import React from "react";
import { DataTable } from "../DataTable";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { useMediaQuery } from "usehooks-ts";
import Image from "next/image";
import ArticleTableAction from "./ArticleTableAction";

const columns: ColumnDef<ArticleWithRelations>[] = [
    {
        accessorKey: "actions",
        header: "عملیات",
        cell: ({ row }) => {
            const article = row.original;
            return <ArticleTableAction articleId={article.id} />;
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
        accessorKey: "title",
        header: "عنوان",
    },
    {
        accessorKey: "short_name",
        header: "نام کوتاه",
    },
    {
        accessorKey: "category",
        header: "دسته بندی",
        cell: ({ row }) => row.original.category.title,
    },
    {
        accessorKey: "author",
        header: "نویسنده",
        cell: ({ row }) => row.original.author.name,
    },
    {
        accessorKey: "image",
        header: "تصویر",
        cell: ({ row }) => {
            return (
                <span className="block relative w-24 h-12 rounded overflow-hidden">
                    <Image
                        alt="img"
                        fill
                        objectFit="cover"
                        src={row.getValue("image")}
                    />
                </span>
            );
        },
    },
];

export default function CategoriesTable({
    data,
}: {
    data: ArticleWithRelations[];
}) {
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isTablet = useMediaQuery("(max-width: 1280px)");
    React.useEffect(() => {
        if (isMobile) {
            setColumnVisibility({
                id: false,
                short_name: false,
                title: true,
                category: true,
                author: false,
                image: false,
            });
        } else if (isTablet) {
            setColumnVisibility({
                id: true,
                short_name: false,
                title: true,
                category: true,
                author: true,
                image: false,
            });
        } else {
            setColumnVisibility({
                id: true,
                short_name: true,
                title: true,
                category: true,
                author: true,
                image: true,
            });
        }
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
