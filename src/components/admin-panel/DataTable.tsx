"use client";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React, { useEffect } from "react";
import { DataTableProps } from "@/src/lib/definition";
import { MyPagination } from "./MyPagination";

export function DataTable<TData, TValue>({
    columns,
    data,
    columnVisibility,
    onColumnVisibilityChange,
}: DataTableProps<TData, TValue>) {
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 8,
    });
    const table = useReactTable({
        data,
        columns,
        pageCount: Math.ceil(data.length / pagination.pageSize),
        state: { pagination, columnVisibility },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: onColumnVisibilityChange,
    });

    return (
        <div className="">
            <Table className="font-YekanBakh-SemiBold mb-8">
                <TableHeader className="h-20">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            className="border-b-teal-600"
                            key={headerGroup.id}
                        >
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    className="text-right"
                                    key={header.id}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                className="border-b-teal-600"
                                key={row.id}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        className="text-right h-16"
                                        key={cell.id}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                داده‌ای پیدا نشد
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {/* Pagination */}
            {data.length > 0 && (
                <MyPagination
                    currentPage={table.getState().pagination.pageIndex + 1}
                    totalPages={table.getPageCount()}
                    onPageChange={(page) => table.setPageIndex(page - 1)}
                />
            )}
        </div>
    );
}
