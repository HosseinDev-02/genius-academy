import PageHeader from "@/src/components/admin-panel/PageHeader";
import MenuItemsTable from "@/src/components/admin-panel/menus/MenusTable";
import SubmenusTable from "@/src/components/admin-panel/submenus/SubmenusTable";
import { getAllSubmenus } from "@/src/lib/actions";
import { Menu, SubMenu, SubMenuWithRelations } from "@/src/lib/type-definition";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function AdminPanelMenuLinks() {
    const submenus = await getAllSubmenus() as unknown as SubMenuWithRelations[]

    console.log("submenus :", submenus);

    return (
        <div>
            {/* Page Header */}
            <PageHeader title="زیرمنو ها" className="!flex" />
            {/* Page Content */}
            <div className="h-full overflow-hidden">
                <Link
                    href="submenus/add"
                    className="col-span-1 inline-flex items-center justify-center gap-2 text-sm h-10 px-3 rounded transition-colors duration-300 bg-teal-800 hover:bg-teal-600 font-YekanBakh-SemiBold text-white cursor-pointer mb-3"
                >
                    <span>افزودن زیرمنو</span>
                    <Plus strokeWidth={"2.5px"} size={16} />
                </Link>
                <SubmenusTable data={submenus} />
            </div>
        </div>
    );
}
