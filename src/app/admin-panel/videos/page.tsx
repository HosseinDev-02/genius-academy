export const revalidate = 10;

import PageHeader from "@/src/components/admin-panel/PageHeader";
import VideosTable from "@/src/components/admin-panel/videos/VideosTable";
import { getAllVideos } from "@/src/lib/storage/videos";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function VideosPage() {
    const videos = await getAllVideos();
    return (
        <div dir="rtl">
            {/* Page Header */}
            <PageHeader title="ویدیو ها" className="!flex" />
            {/* Page Content */}
            <div className="h-full overflow-hidden">
                <Link
                    href="videos/add-video"
                    className="col-span-1 inline-flex items-center justify-center gap-2 text-sm h-10 px-3 rounded transition-colors duration-300 bg-teal-800 hover:bg-teal-600 font-YekanBakh-SemiBold text-white cursor-pointer mb-3"
                >
                    <span>افزودن ویدیو</span>
                    <Plus strokeWidth={"2.5px"} size={16} />
                </Link>
                <VideosTable data={videos} />
            </div>
        </div>
    );
}
