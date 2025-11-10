'use client';
import React, { useEffect, useState } from 'react'
import { DataTable } from '../DataTable'
import { ColumnDef, VisibilityState } from '@tanstack/react-table'
import { CommentWithRelations } from '@/src/lib/type-definition'
import { useMediaQuery } from 'usehooks-ts';

const columns:ColumnDef<CommentWithRelations>[] = [
    {
        accessorKey: "actions",
        header: "عملیات",
    },
    {
        accessorKey: "id",
        header: "#",
        cell:({ row }) => row.index + 1
    },
    {
        accessorKey: "content",
        header: "متن",
    },
    {
        accessorKey: "user",
        header: "کاربر",
        cell: ({ row }) => row.original.user.name
    },
    {
        accessorKey: "target_type",
        header: "مربوط به",
    },
]

export default function CommentsTable({ data }: { data: CommentWithRelations[] }) {
    const [columnVisibility, onColumnVisibilityChange] = useState<VisibilityState>({});
    const isSmallerMobile = useMediaQuery("(max-width: 480px)");
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isTablet = useMediaQuery("(max-width: 1280px)");

    useEffect(() => {
        if(isSmallerMobile) {
            onColumnVisibilityChange({
                id: false,
                content: true,
                user: false,
                target_type: false,
            })
        }else if(isMobile) {
            onColumnVisibilityChange({
                id: false,
                content: true,
                user: true,
                target_type: false,
            })
        }else if(isTablet) {
            onColumnVisibilityChange({
                id: false,
                content: true,
                user: true,
                target_type: true,
            })
        }else{
            onColumnVisibilityChange({
                id: true,
                content: true,
                user: true,
                target_type: true,
            })
        }
    }, [isSmallerMobile, isMobile, isTablet]);

  return (
    <DataTable columns={columns} onColumnVisibilityChange={onColumnVisibilityChange} columnVisibility={columnVisibility} data={data}/>
  )
}
