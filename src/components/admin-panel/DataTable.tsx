"use client";
import {
    ColumnDef,
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
import React from "react";
import PrimaryButton from "../ui/button/PrimaryButton";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 3,
    });

    const table = useReactTable({
        data,
        columns,
        pageCount: Math.ceil(data.length / pagination.pageSize),
        state: { pagination },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });
    return (
        <div>
            <Table className="font-YekanBakh-SemiBold">
                <TableHeader className="h-20">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead className="text-center" key={header.id}>
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
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell className="text-center h-16" key={cell.id}>
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
            <div className="flex items-center justify-center mt-8 gap-4">
                <button onClick={() => table.nextPage()} className="bg-primary rounded-2xl h-12 px-8 flex items-center justify-center">
                    بعدی
                </button>
                <div>
                    <span>
                        صفحه {table.getState().pagination.pageIndex + 1} از{" "}
                        {table.getPageCount()}
                    </span>
                </div>
                <button onClick={() => table.previousPage()} className="bg-primary rounded-2xl h-12 px-8 flex items-center justify-center">
                    قبلی
                </button>
            </div>
        </div>
    );
}
