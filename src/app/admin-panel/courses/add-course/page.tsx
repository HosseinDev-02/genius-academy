import CourseForm from "@/src/components/admin-panel/courses/CourseForm";
import { getAllCategories, getAllCourses, getAllTeachers } from "@/src/lib/actions";
import React from "react";




export default async function AddCourse() {
    // Course : id, title, category, price, img
    const categories = await getAllCategories();
    const teachers = await getAllTeachers()
    const courses = await getAllCourses();

    console.log('courses :', courses)
    

    return (
        <div>
            {/* Page Header */}
            {/* Page Content */}
            <CourseForm teachers={teachers} categories={categories}/>
        </div>
    );
}
