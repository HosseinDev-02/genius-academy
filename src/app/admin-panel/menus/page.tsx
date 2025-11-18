export const revalidate = 10;

import PageHeader from "@/src/components/admin-panel/PageHeader";
import MenuItemsTable from "@/src/components/admin-panel/menus/MenusTable";
import { getAllMenus } from "@/src/lib/storage/menus";
import { Menu } from "@/src/lib/type-definition";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function AdminPanelMenuLinks() {
    const menus = await getAllMenus();
    return (
        <div dir="rtl">
            {/* Page Header */}
            <PageHeader title="منو ها" className="!flex" />
            {/* Page Content */}
            <div className="h-full overflow-hidden">
                <Link
                    href="menus/add"
                    className="col-span-1 inline-flex items-center justify-center gap-2 text-sm h-10 px-3 rounded transition-colors duration-300 bg-teal-800 hover:bg-teal-600 font-YekanBakh-SemiBold text-white cursor-pointer mb-3"
                >
                    <span>افزودن منو</span>
                    <Plus strokeWidth={"2.5px"} size={16} />
                </Link>
                <MenuItemsTable data={menus} />
            </div>
        </div>
    );
}
