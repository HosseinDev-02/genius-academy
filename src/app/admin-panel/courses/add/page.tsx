import PageHeader from "@/src/components/admin-panel/PageHeader";
import CourseForm from "@/src/components/admin-panel/courses/CourseForm";
import { getAllCategories } from "@/src/lib/storage/categories";
import { getAllTeachers } from "@/src/lib/storage/users";
import React from "react";

export default async function AddCourse() {
    const teachers = await getAllTeachers();
    const categories = await getAllCategories();
    return (
        <>
            <PageHeader />
            {/* Page Header */}
            {/* Page Content */}
            <CourseForm teachers={teachers} categories={categories} mode="add" />
        </>
    );
}
