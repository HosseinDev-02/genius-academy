"use client";
import React, { useEffect, useState } from "react";
import EducationIcon from "../../icon/EducationIcon";
import { LucideFileText } from "lucide-react";
import SubTitle from "../SubTitle";
import { courses } from "@/src/lib/placeholder-data";
import UserCourse from "../user-panel/UserCourse";
import UserCoursesMenu from "./UserCoursesMenu";
import { Course } from "@/src/lib/definition";

export default function UserCourses() {
    const [type, setType] = useState("inProgress");
    const [filteredCourses, setFilteredCourses] =  useState<Course[]>([]);

    useEffect(() => {
        if(type === 'inProgress' ) {
           const inProgressCourses = courses.filter((course) => !course.isCompleted);
           setFilteredCourses(inProgressCourses)
        }else {
            const completedCourses = courses.filter((course) => course.isCompleted);
            setFilteredCourses(completedCourses)
        }
    }, [type]);

    return (
        <>
            <div className="my-5">
                <SubTitle title="دوره های من"></SubTitle>
                <UserCoursesMenu type={type} setType={setType} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {filteredCourses.map(course => (
                    <UserCourse key={course.id} {...course}></UserCourse>
                ))}
            </div>
        </>
    );
}
