import EducationIcon from "@/src/components/icon/EducationIcon";
import SubTitle from "@/src/components/ui/SubTitle";
import UserCourse from "@/src/components/ui/user-panel/UserCourse";
import UserCourses from "@/src/components/ui/user/UserCourses";
import UserCoursesProvider from "@/src/components/ui/user/UserCourses";
import { courses } from "@/src/lib/placeholder-data";
import { getMe } from "@/src/lib/storage/me";
import { getUserCourses } from "@/src/lib/storage/users";
import { notFound } from "next/navigation";
import React from "react";

export default async function Courses() {
    const user = await getMe();

    if (!user) {
        notFound();
    }
    const userCourses = await getUserCourses(user.id);

    return <UserCourses userCourses={userCourses}/>;
}
