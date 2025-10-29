import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationControlsProps } from "@/src/lib/definition";
import PrimaryButton from "../ui/button/PrimaryButton";
import { Button } from "@/components/ui/button";

export function MyPagination({
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
        <Pagination>
            <PaginationContent className="flex justify-center flex-row-reverse gap-2">
                {/* دکمه قبلی */}
                <PaginationItem>
                    <Button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`bg-teal-800 text-white font-YekanBakh-SemiBold cursor-pointer hover:bg-teal-600`}
                    >
                        قبلی
                    </Button>
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
                                className={`cursor-pointer border-none text-white ${
                                    page === currentPage ?
                                    "bg-teal-800" : "hover:bg-teal-600"
                                }`}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                {/* دکمه بعدی */}
                <PaginationItem>
                    <Button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`bg-teal-800 text-white font-YekanBakh-SemiBold cursor-pointer hover:bg-teal-600`}
                    >
                        بعدی
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
