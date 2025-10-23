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

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import React from "react";
import PrimaryButton from "../ui/button/PrimaryButton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function PaginationControls({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationControlsProps) {
    // این تابع مشخص می‌کنه چه شماره صفحاتی باید نمایش داده بشن
    const getVisiblePages = () => {
        const pages: (number | "ellipsis")[] = [];

        if (totalPages <= 4) {
            // اگر کل صفحات کم بودن، همه رو نشون بده
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // صفحات زیادن
            if (currentPage <= 3) {
                // ابتدای صفحه‌ها
                pages.push(1, 2, 3, "ellipsis", totalPages);
            } else if (currentPage >= totalPages - 2) {
                // انتهای صفحه‌ها
                pages.push(
                    1,
                    "ellipsis",
                    totalPages - 2,
                    totalPages - 1,
                    totalPages
                );
            } else {
                // وسط صفحه‌ها
                pages.push(
                    1,
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "ellipsis",
                    totalPages
                );
            }
        }

        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <Pagination dir="rtl">
            <PaginationContent
                dir="rtl"
                className="flex justify-center flex-row-reverse"
            >
                {/* دکمه قبلی */}
                <PaginationItem>
                    <PrimaryButton
                        title="قبلی"
                        clickEvent={() => onPageChange(currentPage - 1)}
                        className={
                            currentPage === 1
                                ? "opacity-50 pointer-events-none"
                                : "cursor-pointer"
                        }
                    />
                </PaginationItem>
                {/* شماره صفحات */}
                {visiblePages.map((page, index) =>
                    page === "ellipsis" ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={page}>
                            <PaginationLink
                                onClick={() => onPageChange(page)}
                                isActive={page === currentPage}
                                className={`cursor-pointer ${page === currentPage && 'bg-primary text-white'}`}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                {/* دکمه بعدی */}
                <PaginationItem>
                    <PrimaryButton
                        title="بعدی"
                        clickEvent={() => onPageChange(currentPage + 1)}
                        className={
                            currentPage === totalPages
                                ? "opacity-50 pointer-events-none"
                                : "cursor-pointer"
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 2,
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

    console.log("table :", table.getState());
    return (
        <div>
            <Table className="font-YekanBakh-SemiBold">
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
            {/* <Pagination dir="rtl">
                <PaginationContent>
                    <PaginationItem>
                        <Button
                            className="flex items-center justify-center gap-2 bg-indigo-400 px-8 h-12"
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight className="w-4 h-4" />
                            <span>بعدی</span>
                        </Button>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink size={"lg"} href="#">
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <Button
                            className="flex items-center justify-center gap-2 bg-indigo-400 px-8 h-12"
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span>قبلی</span>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination> */}
            <PaginationControls
                currentPage={table.getState().pagination.pageIndex + 1}
                totalPages={table.getPageCount()}
                onPageChange={(page) => table.setPageIndex(page - 1)}
            />
        </div>
    );
}
