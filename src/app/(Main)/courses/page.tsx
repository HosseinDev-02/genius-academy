import SectionHeader from "@/src/components/ui/section/SectionHeader";
import SectionTitle from "@/src/components/ui/section/SectionTitle";
import Course from "@/src/components/ui/Course";
import React from "react";
import { courses } from "@/src/lib/placeholder-data";
import CoursesProvider from "@/src/components/section/courses/CoursesProvider";
import { getAllCourses } from "@/src/lib/actions";

export default async function Courses() {
    const allCourses = await getAllCourses()
    console.log('courses :', allCourses)
    return (
        <main className="py-5">
            <div className="container">
                <div className="space-y-8">
                    <SectionHeader>
                        <SectionTitle
                            lineHeight="1rem"
                            fontSize="12px"
                            title="دوره های آموزشی"
                            text="دوره ببین، تمرین کن، برنامه نویس شو"
                        ></SectionTitle>
                    </SectionHeader>
                    <CoursesProvider>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                            {allCourses.map((course) => (
                                <Course key={course.id} {...course}></Course>
                            ))}
                        </div>
                    </CoursesProvider>
                </div>
            </div>
        </main>
    );
}
