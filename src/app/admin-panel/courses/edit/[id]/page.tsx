import CourseForm from '@/src/components/admin-panel/courses/CourseForm'
import React from 'react'

interface EditCourseProp {
    params: { id: string };
  }

export default function EditCourse({ params }: EditCourseProp) {
  return (
    <div>
        {/* Edit Course Form */}
        <CourseForm courseId='ffkhuslfuioafioa93423y4afudoh'/>
    </div>
  )
}
