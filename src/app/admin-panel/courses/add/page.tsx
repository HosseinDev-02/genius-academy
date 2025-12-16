import PageHeader from "@/src/components/admin-panel/PageHeader";
import CourseForm from "@/src/components/admin-panel/courses/CourseForm";
import React from "react";

export default async function AddCourse() {
    return (
        <>
            <PageHeader />
            {/* Page Header */}
            {/* Page Content */}
            <CourseForm mode="add" />
        </>
    );
}
