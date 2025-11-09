"use client";
import React from "react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
export default function MenuTableAction({
    menuId,
}: {
    menuId: string;
}) {
    const router = useRouter()
    const handleDeleteMenu = async () => {
        try {
            const response = await fetch(`/api/menus/${menuId}`, {
                method: "DELETE",
            });

            console.log("response :", response);

            if (response.ok) {
                toast.success("ایتم با موفقیت حذف شد");
                router.refresh();
            } else {
                throw new Error("هنگام حذف ایتم خطایی رخ داد");
            }
        } catch (error) {
            toast.error("هنگام حذف ایتم خطایی رخ داد");
        }
    };
    return (
        <>
            <DropdownMenu dir="rtl" modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="bg-zinc-800 border-0 cursor-pointer"
                        variant="outline"
                        aria-label="Open menu"
                        size="icon-sm"
                    >
                        <MoreHorizontalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 bg-zinc-800 border-0 transition-all duration-300 *:hover:bg-zinc-700 *:hover:opacity-80">
                    <DropdownMenuItem className="p-3">
                        <Link
                            className="flex items-center justify-start gap-2 text-white"
                            href={`menus/edit/${menuId}`}
                        >
                            <PencilIcon size={18} />
                            <span className="font-YekanBakh-SemiBold text-sm">
                                ویرایش
                            </span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleDeleteMenu()}
                        className="p-3 flex items-center cursor-pointer text-red-600"
                    >
                        <TrashIcon size={18} />
                        <span className="font-YekanBakh-SemiBold text-sm">
                            حذف
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 2500,
                    classNames: {
                        success: "!bg-teal-700",
                        error: "!bg-red-700",
                    },
                    className: "!text-white !border-none",
                }}
            />
        </>
    );
}
