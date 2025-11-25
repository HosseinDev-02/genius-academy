import React from "react";
import SubTitle from "../../ui/SubTitle";
import PrimaryButton from "../../ui/button/PrimaryButton";
import { LucideArrowUpLeft } from "lucide-react";
import LikeButton from "../../ui/button/LikeButton";
import { CourseWithRelations, User } from "@/src/lib/type-definition";
import { Button } from "@/components/ui/button";

export default function CourseRegister({
    course,
    user
}: {
    course: CourseWithRelations;
    user: User | null
}) {
    // const { user } = useAuthContext();
    return (
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
                        <Button className="primary-btn">
                            <span>افزودن به سبد</span>
                            <LucideArrowUpLeft size={20} />
                        </Button>
                        <LikeButton />
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
    );
}
