"use client";
import React, { useEffect, useState } from "react";
import EducationIcon from "../../icon/EducationIcon";
import { LucideFileText } from "lucide-react";
import SubTitle from "../SubTitle";
import { courses } from "@/src/lib/placeholder-data";
import UserCourse from "../user-panel/UserCourse";
import UserCoursesMenu from "./UserCoursesMenu";
import { CourseWithRelations } from "@/src/lib/type-definition";

export default function UserCourses({
    userCourses,
}: {
    userCourses: CourseWithRelations[];
}) {
    const [type, setType] = useState("inProgress");
    const [filteredCourses, setFilteredCourses] = useState<
        CourseWithRelations[]
    >([]);

    useEffect(() => {
        console.log("type :", type);

        let newList = [];

        if (type === "inProgress") {
            console.log("inProgress");
            newList = userCourses.filter((course) => !course.is_completed);
            console.log("inProgressCourses :", newList);
        } else {
            newList = userCourses.filter((course) => course.is_completed);
            console.log("completedCourses :", newList);
        }

        setFilteredCourses(newList);
    }, [type, userCourses]);

    useEffect(() => {
        console.log("filteredCourses", filteredCourses);
    }, [filteredCourses]);

    return (
        <>
            <div className="my-5">
                <SubTitle title="دوره های من"></SubTitle>
                <UserCoursesMenu type={type} setType={setType} />
            </div>
            {filteredCourses.length !== 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                    {filteredCourses?.map((course) => (
                        <UserCourse key={course.id} course={course} />
                    ))}
                </div>
            )}
        </>
    );
}
