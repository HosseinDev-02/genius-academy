import CourseForm from "@/src/components/admin-panel/courses/CourseForm";
import { getAllCategories, getAllTeachers } from "@/src/lib/actions";
import { Course } from "@/src/lib/type-definition";
import React from "react";

export default async function EditCourse(context: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await context.params;
    console.log("id : ", id);
    const categories = await getAllCategories();
    const teachers = await getAllTeachers();
    const course = await fetch(`http://localhost:3000/api/courses/${id}`).then(
        (res) => res.json()
    );
    return (
        <div>
            {/* Edit Course Form */}
            <CourseForm
                defaultValues={{
                    title: course.title,
                    about: course.about,
                    user_id: course.user_id,
                    category_id: course.category_id,
                    price: course.price,
                    short_name: course.short_name,
                    is_completed: course.is_completed ? 'isCompleted' : 'inProgress',
                    image: course.image,
                    content: course.content,
                }}
                courseId={id}
                mode="edit"
                teachers={teachers}
                categories={categories}
            />
        </div>
    );
}
