import PageHeader from "@/src/components/admin-panel/PageHeader";
import UsersTable from "@/src/components/admin-panel/users/UsersTable";
import { getAllUsers } from "@/src/lib/actions";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function AdminPanelUsers() {
  const users = await getAllUsers()
    return (
        <div>
            {/* Page Header */}
            <PageHeader title="کاربران" className="!flex" />
            {/* Page Content */}
            <div className="overflow-hidden h-full">
                <Link
                    href="users/add-user"
                    className="col-span-1 inline-flex items-center justify-center gap-2 text-sm h-10 px-3 rounded transition-colors duration-300 bg-teal-800 hover:bg-teal-600 font-YekanBakh-SemiBold text-white cursor-pointer mb-3"
                >
                    <span>افزودن کاربر</span>
                    <Plus strokeWidth={"2.5px"} size={16} />
                </Link>
                <UsersTable data={users}/>
            </div>
        </div>
    );
}
