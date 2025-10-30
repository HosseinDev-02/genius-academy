import CourseForm from "@/src/components/admin-panel/courses/CourseForm";
import { getAllCategories } from "@/src/lib/actions";
import React from "react";




export default async function AddCourse() {
    // Course : id, title, category, price, img
    const categories = await getAllCategories();
    console.log('categories :', categories)
    

    return (
        <div>
            {/* Page Header */}
            {/* Page Content */}
            <CourseForm/>
        </div>
    );
}
