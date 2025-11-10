import PageHeader from "@/src/components/admin-panel/PageHeader";
import SubSubmenusTable from "@/src/components/admin-panel/sub-submenus/SubSubmenusTable";
import { getAllSubSubmenus } from "@/src/lib/actions";
import { SubSubmenuWithRelations } from "@/src/lib/type-definition";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function SubSubmenuPage() {
    const subSubmenus =
        (await getAllSubSubmenus()) as unknown as SubSubmenuWithRelations[];
    console.log("sub-submenus :", subSubmenus);
    return (
        <div>
            {/* Page Header */}
            <PageHeader className="!flex" title="منوهای فرعی" />
            {/* Page Content */}
            <div className="h-full overflow-hidden">
                <Link
                    href="sub-submenus/add"
                    className="col-span-1 inline-flex items-center justify-center gap-2 text-sm h-10 px-3 rounded transition-colors duration-300 bg-teal-800 hover:bg-teal-600 font-YekanBakh-SemiBold text-white cursor-pointer mb-3"
                >
                    <span>افزودن زیرمنو فرعی</span>
                    <Plus strokeWidth={"2.5px"} size={16} />
                </Link>
                <SubSubmenusTable data={subSubmenus} />
            </div>
        </div>
    );
}
