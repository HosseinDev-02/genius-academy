import CourseForm from "@/src/components/admin-panel/courses/CourseForm";
import { getAllCategories, getAllCourses, getAllTeachers } from "@/src/lib/actions";
import React from "react";




export default async function AddCourse() {
    return (
        <div>
            {/* Page Header */}
            {/* Page Content */}
            <CourseForm mode="add"/>
        </div>
    );
}
