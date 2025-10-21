import EducationIcon from "@/src/components/icon/EducationIcon";
import SubTitle from "@/src/components/ui/SubTitle";
import UserCourse from "@/src/components/ui/user-panel/UserCourse";
import UserCourses from "@/src/components/ui/user/UserCourses";
import UserCoursesProvider from "@/src/components/ui/user/UserCourses";
import { courses } from "@/src/lib/placeholder-data";
import React from "react";

export default function Courses() {
    return (
        <UserCourses />
    );
}
