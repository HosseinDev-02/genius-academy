"use client";
import {
    VisibilityState,
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
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

export function DataTable<TData, TValue>({
    columns,
    data,
    columnVisibility,
    onColumnVisibilityChange
}: DataTableProps<TData, TValue>) {
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 4,
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

    // useEffect(( ) => {
    //     console.log('column visibility changed')
    // }, [columnVisibility])

    return (
        <div>
            <div className="flex items-center justify-start py-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="bg-indigo-500 text-white"
                            variant="outline"
                        >
                            Columns <ChevronDownIcon className="ml-2 size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    checked={column.getIsVisible()}
                                    className="capitalize bg-primary text-white cursor-pointer"
                                    key={column.id}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Table className="font-YekanBakh-SemiBold mb-8">
                <TableHeader className="h-20">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    className="text-center"
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
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        className="text-center h-16"
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
            <MyPagination
                currentPage={table.getState().pagination.pageIndex + 1}
                totalPages={table.getPageCount()}
                onPageChange={(page) => table.setPageIndex(page - 1)}
            />
        </div>
    );
}
