import EducationIcon from "@/src/components/icon/EducationIcon";
import SubTitle from "@/src/components/ui/SubTitle";
import { userComments } from "@/src/lib/placeholder-data";
import { LucideFileText } from "lucide-react";
import React from "react";
import UserComment from "@/src/components/ui/UserComment";
export default function Questions() {
    return (
        <div>
            <div className="my-5">
                <SubTitle title="دیدگاه و پرسشهای شما"></SubTitle>
                <div className="overflow-x-auto">
                    <ul className="bg-secondary rounded-full inline-flex items-center gap-5 border border-border p-1 mt-5">
                        <li>
                            <button className="flex items-center gap-2 h-10 rounded-full px-5 hover:bg-background hover:text-title transition-colors user-courses-menu__item--active">
                                <EducationIcon width={20} height={20}/>
                                <span className="text-sm font-YekanBakh-Bold text-nowrap">
                                    دوره های آموزشی
                                </span>
                            </button>
                        </li>
                        <li>
                            <button className="flex items-center gap-2 h-10 rounded-full px-5 hover:bg-background hover:text-title transition-colors">
                                <LucideFileText size={20}/>
                                <span className="text-sm font-YekanBakh-Bold text-nowrap">
                                    مقالات آموزشی
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="divide-y divide-border">
                {userComments.map((comment) => (
                    <UserComment
                        key={comment.id}
                        {...comment}
                    />
                ))}
            </div>
        </div>
    );
}
