// export const revalidate = 10;

import PageHeader from "@/src/components/admin-panel/PageHeader";
import React, { useState } from "react";
import Link from "next/link";
import { MoreHorizontalIcon, PencilIcon, Plus, TrashIcon } from "lucide-react";
import CoursesTable from "@/src/components/admin-panel/courses/CoursesTable";
import { getAllCourses } from "@/src/lib/storage/courses";


export default async function AdminPanelCourses() {
    const courses = await getAllCourses();
    return (
        <div className="grow flex flex-col">
            {/* Page Header */}
            <PageHeader />
            {/* Page Content */}
            <div className="h-full">
                {/* Course Table Header */}
                <Link
                    href="courses/add"
                    className="col-span-1 inline-flex items-center justify-center gap-2 text-sm h-10 px-3 rounded transition-colors duration-300 bg-teal-800 hover:bg-teal-600 font-YekanBakh-SemiBold text-white cursor-pointer mb-3"
                >
                    <span>افزودن دوره</span>
                    <Plus strokeWidth={"2.5px"} size={16} />
                </Link>
                {/* Courses Table */}
                <CoursesTable data={courses} />
            </div>
        </div>
    );
}
