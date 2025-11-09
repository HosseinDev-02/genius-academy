import PageHeader from "@/src/components/admin-panel/PageHeader";
import React, { useState } from "react";
import Link from "next/link";
import { MoreHorizontalIcon, PencilIcon, Plus, TrashIcon } from "lucide-react";
import CoursesTable from "@/src/components/admin-panel/courses/CoursesTable";
import { getAllCourses } from "@/src/lib/actions";

type Category = {
    id: string;
    title: string;
    short_name: string;
}

type User = {
    id: string;
    name: string;
    role: string;
    image: string;
}

type Course = {
    id: string;
    title: string;
    category: Category;
    price: number;
    image?: any;
    user: User;
    short_name: string;
    is_completed: boolean;
    created_at: Date;
    updated_at: Date;
    content: any;
    about: string;
};

export default async function AdminPanelCourses() {
    const courses = await getAllCourses() as unknown as Course[];
    return (
        <div className="h-full flex flex-col">
            {/* Page Header */}
            <PageHeader title="دوره ها" />
            {/* Page Content */}
            <div className="h-full overflow-hidden">
                {/* Course Table Header */}
                <Link
                    href="courses/add-course"
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
