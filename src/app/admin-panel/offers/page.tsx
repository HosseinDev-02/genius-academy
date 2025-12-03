import PageHeader from "@/src/components/admin-panel/PageHeader";
import MenuItemsTable from "@/src/components/admin-panel/menus/MenusTable";
import OffersTable from "@/src/components/admin-panel/offers/OffersTable";
import { getAllOffers } from "@/src/lib/storage/offers";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function OffersPage() {
    const offers = await getAllOffers();
    console.log('offers :', offers);
    return (
        <div dir="rtl">
            {/* Page Header */}
            <PageHeader title="تخفیف ها" className="!flex" />
            {/* Page Content */}
            <div className="h-full overflow-hidden">
                <Link
                    href="offers/add"
                    className="col-span-1 inline-flex items-center justify-center gap-2 text-sm h-10 px-3 rounded transition-colors duration-300 bg-teal-800 hover:bg-teal-600 font-YekanBakh-SemiBold text-white cursor-pointer mb-3"
                >
                    <span>افزودن تخفیف</span>
                    <Plus strokeWidth={"2.5px"} size={16} />
                </Link>
                <OffersTable data={offers} />
            </div>
        </div>
    );
}
