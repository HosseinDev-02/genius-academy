"use client";
import React, { useState } from "react";
import SubTitle from "../../ui/SubTitle";
import PrimaryButton from "../../ui/button/PrimaryButton";
import { LucideArrowUpLeft } from "lucide-react";
import LikeButton from "../../ui/button/LikeButton";
import { Course, CourseWithRelations, User } from "@/src/lib/type-definition";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { getUserCourseById } from "@/src/lib/storage/users";

export default function CourseRegister({
    course,
    user,
    isUserRegisteredInCourse,
}: {
    course: CourseWithRelations;
    user: User | null;
    isUserRegisteredInCourse: Course | null;
}) {
    // const { user } = useAuthContext();
    const router = useRouter();

    const courseRegisterHandler = async () => {
        try {
            const courseInfo = {
                course_id: course.id,
                user_id: user?.id,
            };
            console.log("courseInfo :", courseInfo);

            const response = await fetch("/api/users/courses", {
                method: "POST",
                body: JSON.stringify(courseInfo),
            });

            const result = await response.json();
            console.log(result);

            if (result.success) {
                toast.success(result.message);
                router.refresh();
            } else if (result.error) {
                throw new Error(result.error);
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error instanceof Error ? error.message : "خطایی رخ داد"
            );
        }
    };
    return (
        <>
            <div className="bg-gradient-to-b from-secondary to-background rounded-2xl px-5 pb-5">
                <div className="bg-background rounded-bl-2xl rounded-br-2xl p-5 mb-5">
                    <SubTitle title="نام نویسی در دوره" />
                </div>
                <div className="flex items-center justify-between">
                    <span className="font-YekanBakh-Bold">هزینه ثبت نام :</span>
                    <div className="flex flex-col items-end">
                        <span className="line-through">1,900,000</span>
                        <div className="flex items-center gap-1">
                            <span className="text-xl text-title font-YekanBakh-Black">
                                {Number(course.price).toLocaleString()}
                            </span>
                            <span className="text-xs hidden lg:inline-block">
                                تومان
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 mt-3">
                    {user ? (
                        <>
                            {!isUserRegisteredInCourse ? (
                                <>
                                    <Button
                                        onClick={courseRegisterHandler}
                                        className="primary-btn"
                                    >
                                        <span>ثبت نام در دوره</span>
                                        <LucideArrowUpLeft size={20} />
                                    </Button>
                                    <LikeButton />
                                </>
                            ) : (
                                <div className="primary-btn pointer-events-none">
                                    <span>شما دانشجوی دوره هستید</span>
                                </div>
                            )}
                        </>
                    ) : (
                        <PrimaryButton
                            icon={<LucideArrowUpLeft size={20} />}
                            title="ابتدا وارد شوید"
                            href="/login"
                        />
                    )}
                </div>
            </div>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 2500,
                    classNames: {
                        success: "!bg-teal-700",
                        error: "!bg-red-700",
                    },
                    className: "!text-white !border-none",
                }}
            />
        </>
    );
}
