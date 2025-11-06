import CourseForm from "@/src/components/admin-panel/courses/CourseForm";
import { getAllCategories, getAllTeachers } from "@/src/lib/actions";
import React from "react";


export default async function EditCourse(context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    console.log("id : ", id)
    const categories = await getAllCategories();
    const teachers = await getAllTeachers()
    return (
        <div>
            {/* Edit Course Form */}
            <CourseForm teachers={teachers} categories={categories} courseId={id} />
        </div>
    );
}
