import CourseForm from "@/src/components/admin-panel/courses/CourseForm";
import React from "react";

interface EditCourseProp {
    params: { id: string };
}

export default function EditCourse({ params }: EditCourseProp) {
    const { id } = params;
    return (
        <div>
            {/* Edit Course Form */}
            <CourseForm courseId={id} />
        </div>
    );
}
