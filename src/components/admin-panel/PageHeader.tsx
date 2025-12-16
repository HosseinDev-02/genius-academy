"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const breadcrumbMap: Record<string, string> = {
    'admin-panel': 'پنل مدیریت',
    'courses': 'دوره ها',
    'add': 'افزودن',
    'edit': 'ویرایش'
}

export default function PageHeader() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    return (
        <div className="flex items-center gap-1 text-sm font-YekanBakh-Bold pb-4 mb-4 border-b border-gray-700">
            {segments.map((segment, index) => {
                const href = "/" + segments.slice(0, index + 1).join("/");
                const isLast = index === segments.length - 1;
                return (
                    <span className="flex items-center gap-1" key={index}>
                        {index !== 0 && <span>/</span>}
                        {isLast ? (
                            <span className="text-teal-600">{breadcrumbMap[segment]}</span>
                        ) : (
                            <Link href={href}>
                                {breadcrumbMap[segment]}
                            </Link>
                        )}
                    </span>
                );
            })}
        </div>
    );
}
