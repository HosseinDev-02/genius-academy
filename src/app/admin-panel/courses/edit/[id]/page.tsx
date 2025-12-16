import PageHeader from "@/src/components/admin-panel/PageHeader";
import CourseForm from "@/src/components/admin-panel/courses/CourseForm";
import React from "react";

export default async function EditCourse(context: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await context.params;
    const response = await fetch(`http://localhost:3000/api/courses/${id}`);
    const course = await response.json();
    return (
        <>
            <PageHeader />
            {/* Edit Course Form */}
            <CourseForm
                defaultValues={{
                    title: course.title,
                    about: course.about,
                    user_id: course.user_id,
                    category_id: course.category_id,
                    price: course.price,
                    short_name: course.short_name,
                    is_completed: course.is_completed
                        ? "isCompleted"
                        : "inProgress",
                    image: course.image,
                    content: course.content,
                }}
                courseId={id}
                mode="edit"
            />
        </>
    );
}
