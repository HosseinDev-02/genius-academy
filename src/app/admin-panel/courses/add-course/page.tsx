import CourseForm from "@/src/components/admin-panel/courses/CourseForm";
import { getAllCategories, getAllTeachers } from "@/src/lib/actions";
import React from "react";




export default async function AddCourse() {
    // Course : id, title, category, price, img
    const categories = await getAllCategories();
    const teachers = await getAllTeachers()
    

    return (
        <div>
            {/* Page Header */}
            {/* Page Content */}
            <CourseForm teachers={teachers} categories={categories}/>
        </div>
    );
}
