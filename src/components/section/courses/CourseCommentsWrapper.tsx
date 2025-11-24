import React from "react";
import SubTitle from "../../ui/SubTitle";
import CourseCommentForm from "./CourseCommentForm";
import { CourseWithRelations } from "@/src/lib/type-definition";
import { getCommentsByShortName } from "@/src/lib/storage/comments";
import UserInfo from "../../ui/user/UserInfo";
import CommentReplyButton from "./CommentReplyButton";

export default async function CourseCommentsWrapper({
    course,
}: {
    course: CourseWithRelations;
}) {
    const { short_name } = course;

    const comments = await getCommentsByShortName({
        courseShortName: short_name,
        articleShortName: null,
    });

    console.log("comments :", comments);

    return (
        <>
            <SubTitle title="دیدگاه و پرسش"></SubTitle>
            <CourseCommentForm course={course} />
            <div>
                {comments.map((comment) => (
                    <div key={comment.id}>
                        {/* main comment */}
                        <div className="p-5 rounded-2xl border border-border mb-3">
                            <div className="flex items-center justify-between pb-4 border-b border-border">
                                <UserInfo
                                    name="2 هفته پیش"
                                    title={comment.user?.name}
                                    image={comment.user?.image || '/images/profile.jpeg'}
                                />
                                <CommentReplyButton commentId={comment.id} />
                            </div>
                            <p className="text-sm mt-3">{comment.content}</p>
                        </div>
                        {/* sub comments */}
                        <div className='pr-16 space-y-3 relative before:w-px before:bg-border before:content-[""] before:absolute before:h-[calc(100%-24px)] before:right-6 before:-top-3 after:bg-border after:content-[""] after:h-px after:w-10 after:right-6 after:absolute after:bottom-9'>
                            {comment.replies?.map((reply) => (
                                <div
                                    key={reply.id}
                                    className="p-5 rounded-2xl border border-border"
                                >
                                    <div className="flex items-center justify-between pb-4 border-b border-border">
                                        <UserInfo
                                            name="2 هفته پیش"
                                            title={reply.user?.name}
                                            image={reply.user?.image! || '/images/profile.jpeg'}
                                        />
                                    </div>
                                    <p className="text-sm mt-3">
                                        {reply.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
