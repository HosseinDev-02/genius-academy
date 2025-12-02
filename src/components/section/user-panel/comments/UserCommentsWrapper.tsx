"use client";
import EducationIcon from "@/src/components/icon/EducationIcon";
import SubTitle from "@/src/components/ui/SubTitle";
import { LucideFileText } from "lucide-react";
import React, { useEffect, useState } from "react";
import UserComment from "@/src/components/ui/user-panel/UserComment";
import { UserComment as UserCommentType } from "@/src/lib/storage/users";

export default function UserCommentsWrapper({
    userComments,
}: {
    userComments: UserCommentType[];
}) {
    const [type, setType] = useState("course");
    const [filteredComments, setFilteredComments] = useState<UserCommentType[]>(
        []
    );

    useEffect(() => {
        console.log("type :", type);

        let newList = [];

        if (type === "course") {
            console.log("course");
            newList = userComments.filter((course) => course.course);
            console.log("courseComments :", newList);
        } else {
            newList = userComments.filter((comment) => comment.article);
            console.log("articleComments :", newList);
        }

        setFilteredComments(newList);
    }, [type, userComments]);

    useEffect(() => {
        console.log("filtered comments :", filteredComments);
    }, [filteredComments]);

    return (
        <div>
            <div className="my-5">
                <SubTitle title="دیدگاه و پرسشهای شما"></SubTitle>
                <div className="overflow-x-auto">
                    <ul className="bg-secondary rounded-full inline-flex items-center gap-5 border border-border p-1 mt-5">
                        <li>
                            <button
                                onClick={() => {
                                    setType("course");
                                }}
                                className={`flex items-center gap-2 h-10 rounded-full px-5 hover:bg-background hover:text-title transition-colors cursor-pointer ${
                                    type === "course" && "text-title bg-background"
                                }`}
                            >
                                <EducationIcon width={20} height={20} />
                                <span className="text-sm font-YekanBakh-Bold text-nowrap">
                                    دوره های آموزشی
                                </span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    setType("article");
                                }}
                                className={`flex items-center gap-2 h-10 rounded-full px-5 hover:bg-background hover:text-title transition-colors cursor-pointer ${
                                    type === "article" && "text-title bg-background"
                                }`}
                            >
                                <LucideFileText size={20} />
                                <span className="text-sm font-YekanBakh-Bold text-nowrap">
                                    مقالات آموزشی
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="divide-y divide-border">
                {filteredComments?.map((comment) => (
                    <UserComment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
}
