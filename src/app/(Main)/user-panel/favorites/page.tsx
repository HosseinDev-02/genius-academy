import SubTitle from "@/src/components/ui/SubTitle";
import UserFavoriteCourse from "@/src/components/ui/user-panel/UserFavoriteCourse";
import { courses } from "@/src/lib/placeholder-data";
import React from "react";

export default function Favorites() {
    return (
        <div>
            <SubTitle title="دوره هایی که پسندیدید" />
            <div className="divide-y divide-border mt-5">
                {courses.map((course) => (
                    <UserFavoriteCourse
                        {...course}
                        key={course.id}
                    ></UserFavoriteCourse>
                ))}
            </div>
        </div>
    );
}
