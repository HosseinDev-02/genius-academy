import SectionHeader from "@/src/components/ui/section/SectionHeader";
import SectionTitle from "@/src/components/ui/section/SectionTitle";
import Course from "@/src/components/ui/Course";
import Cover from "@/src/components/shared/Cover";
import React from "react";
import {
    courseCategories,
    courseTypes,
    courses,
    sortingCoursesTypes,
} from "@/src/lib/placeholder-data";
import { LucideFilter, LucideStar, LucideX } from "lucide-react";
import Accordion from "@/src/components/ui/Accordion";
import GridBoxesIcon from "@/src/components/icon/GridBoxesIcon";
import GridBoxesOutlineIcon from "@/src/components/icon/GridBoxesOutlineIcon";
import CoursesFilteringSidebar from "@/src/components/section/CoursesFilteringSidebar";
import AdjustmentsIcon from "@/src/components/icon/AdjustmentsIcon";
import CoursesProvider from "@/src/components/section/CoursesProvider";

export default function Courses() {
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
                            {courses.map((course) => (
                                <Course key={course.id} {...course}></Course>
                            ))}
                        </div>
                    </CoursesProvider>
                </div>
            </div>
        </main>
    );
}
