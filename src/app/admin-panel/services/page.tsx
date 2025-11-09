import PageHeader from "@/src/components/admin-panel/PageHeader";
import ServicesTable from "@/src/components/admin-panel/services/ServicesTable";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function AdminPanelServices() {
    const response = await fetch("http://localhost:3000/api/services");
    const services = await response.json();
    console.log(services);
    return (
        <div>
            {/* Page Header */}
            <PageHeader title="خدمات" className="!flex" />
            {/* Page Content */}
            <div className="h-full overflow-hidden">
                <Link
                    href="services/add-service"
                    className="col-span-1 inline-flex items-center justify-center gap-2 text-sm h-10 px-3 rounded transition-colors duration-300 bg-teal-800 hover:bg-teal-600 font-YekanBakh-SemiBold text-white cursor-pointer mb-3"
                >
                    <span>افزودن سرویس</span>
                    <Plus strokeWidth={"2.5px"} size={16} />
                </Link>
                <ServicesTable data={services}/>
            </div>
        </div>
    );
}
