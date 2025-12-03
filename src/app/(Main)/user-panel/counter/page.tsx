import CounterBox from "@/src/components/ui/user-panel/CounterBox";
import SubTitle from "@/src/components/ui/SubTitle";
import UserCourse from "@/src/components/ui/user-panel/UserCourse";
import { courses, userCounterData } from "@/src/lib/placeholder-data";
import React from "react";
import { getUserCourses } from "@/src/lib/storage/users";
import { getMe } from "@/src/lib/storage/me";
import { notFound } from "next/navigation";

export default async function page() {
    const user = await getMe();
    if (!user) {
        notFound();
    }
    const userCourses = await getUserCourses(user.id);
    console.log(userCourses);
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {userCounterData.map((box) => (
                    <CounterBox key={box.id} {...box}></CounterBox>
                ))}
            </div>
            <div>
                <SubTitle title="دوره های در حال یادگیری"></SubTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                    {userCourses.length
                        ? userCourses.map((course) => (
                              <UserCourse
                                  key={course.id}
                                  course={course}
                              ></UserCourse>
                          ))
                        : ""}
                </div>
            </div>
        </div>
    );
}
