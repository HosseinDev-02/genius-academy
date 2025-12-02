import { LucideArrowUpLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import PrimaryButton from "../button/PrimaryButton";
import Image from "next/image";
import { UserComment as UserCommentType } from "@/src/lib/storage/users";

export default function UserComment({
    comment,
}: {
    comment: UserCommentType;
}) {
    const { course: course, article: article, user, status, content } = comment;

    return (
        <div className="flex md:flex-row flex-col md:items-start gap-5 py-8">
            <Link
                className="md:w-4/12 block rounded-3xl overflow-hidden"
                href="/course-detail/react-js"
            >
                <Image
                    width={302}
                    height={170}
                    className="w-full h-full"
                    src={course?.image! ?? article?.image!}
                    alt={course?.title! ?? article?.title!}
                />
            </Link>
            <div className="md:w-8/12 px-5 rounded-3xl bg-gradient-to-b from-secondary to-background">
                <div className="bg-background rounded-b-3xl p-5">
                    <h3 className="line-clamp-1">
                        <Link
                            className="font-YekanBakh-Black text-title transition-colors hover:text-primary"
                            href={course ? `/course-detail/${course.short_name}` : `/article-detail/${article?.short_name}`}
                        >
                            {course?.title! ?? article?.title!}
                        </Link>
                    </h3>
                </div>
                <div className="mt-5">
                    {status === 'approved' ? (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center rounded-full bg-border w-3.5 h-3.5">
                                <span className="bg-success w-1.5 h-1.5 rounded-full"></span>
                            </div>
                            <span className="text-success font-YekanBakh-Bold text-sm">
                                تایید شده
                            </span>
                        </div>
                    ) : status === 'rejected' ? (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center rounded-full bg-border w-3.5 h-3.5">
                                <span className="bg-red-500 w-1.5 h-1.5 rounded-full"></span>
                            </div>
                            <span className="text-red-500 font-YekanBakh-Bold text-sm">
                                رد شده
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center rounded-full bg-border w-3.5 h-3.5">
                                <span className="bg-yellow-500 w-1.5 h-1.5 rounded-full"></span>
                            </div>
                            <span className="text-yellow-500 font-YekanBakh-Bold text-sm">
                                در انتظار تایید
                            </span>
                        </div>
                    )}
                    <p className="line-clamp-2 my-3 text-sm font-YekanBakh-SemiBold">
                        {content}
                    </p>
                    <PrimaryButton
                        href={course ? `/course-detail/${course.short_name}` : `/article-detail/${article?.short_name}`}
                        icon={<LucideArrowUpLeft size={20} />}
                        title="مشاهده در صفحه دوره"
                    ></PrimaryButton>
                </div>
            </div>
        </div>
    );
}
