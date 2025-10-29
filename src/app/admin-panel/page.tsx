import Box from "@/src/components/admin-panel/Box";
import PageHeader from "@/src/components/admin-panel/PageHeader";
import React from "react";

type CounterItem = {
    id: number;
    title: string;
    count: number;
};

const counterItems: CounterItem[] = [
    {
        id: 1,
        title: "کاربران",
        count: 456,
    },
    {
        id: 2,
        title: "دوره ها",
        count: 678,
    },
    {
        id: 4,
        title: "مقاله ها",
        count: 1380,
    },
    {
        id: 3,
        title: "سفارشات",
        count: 3425,
    },
];

export default function Page() {
    return (
        <div>
            {/* Page Header */}
            <PageHeader title="داشبورد" />
            {/* Dashboard Count Boxes */}
            <div className="flex justify-between w-full gap-8">
                {counterItems.map((item) => (
                    <Box key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
}
