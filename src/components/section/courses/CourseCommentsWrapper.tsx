import React from "react";
import SectionLinkBtn from "../../ui/section/SectionLinkBtn";
import { LucideArrowUpLeft, LucideCornerUpRight } from "lucide-react";
import LikeButton from "../../ui/button/LikeButton";
import PrimaryButton from "../../ui/button/PrimaryButton";
import SubTitle from "../../ui/SubTitle";
import { useAuthContext } from "../../layout/LayoutProvider";
import CourseCommentForm from "./CourseCommentForm";

export default function CourseCommentsWrapper() {
    return (
        <>
            <SubTitle title="دیدگاه و پرسش"></SubTitle>
            <CourseCommentForm/>
            <div>
                <div className="p-5 rounded-2xl border border-border mb-3">
                    <div className="flex items-center justify-between pb-4 border-b border-border">
                        {/* <UserInfo
                                            text="2 هفته پیش"
                                            title="حسین رستمی"
                                        ></UserInfo> */}
                        <div className="flex items-center gap-3">
                            <SectionLinkBtn
                                className="h-9 text-xs text-caption"
                                icon={<LucideCornerUpRight size={20} />}
                                text="پاسخ"
                            />
                            <LikeButton className="h-9 w-9" count="3" />
                        </div>
                    </div>
                    <p className="text-sm mt-3">
                        من این دوره رو خریدم و میخوام نکست هم بعدا یاد بگیرم چون
                        نیاز بیشتری دارم به اموزش های این دوره میشه بدون اینکه
                        دوره نکست رو ببینم این دوره رو ببینم(بخش6دوره بیشتر مد
                        نظرمه)
                    </p>
                </div>
                <div className='pr-16 space-y-3 relative before:w-px before:bg-border before:content-[""] before:absolute before:h-[calc(100%-24px)] before:right-6 before:-top-3 after:bg-border after:content-[""] after:h-px after:w-10 after:right-6 after:absolute after:bottom-9'>
                    <div className="p-5 rounded-2xl border border-border">
                        <div className="flex items-center justify-between pb-4 border-b border-border">
                            {/* <UserInfo
                                                text="2 هفته پیش"
                                                title="حسین رستمی"
                                            /> */}
                            <div className="flex items-center gap-3">
                                <SectionLinkBtn
                                    className="h-9 text-xs text-caption"
                                    icon={<LucideCornerUpRight size={20} />}
                                    text="پاسخ"
                                />
                                <LikeButton className="w-9 h-9" count="3" />
                            </div>
                        </div>
                        <p className="text-sm mt-3">
                            من این دوره رو خریدم و میخوام نکست هم بعدا یاد بگیرم
                            چون نیاز بیشتری دارم به اموزش های این دوره میشه بدون
                            اینکه دوره نکست رو ببینم این دوره رو ببینم(بخش6دوره
                            بیشتر مد نظرمه)
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl border border-border">
                        <div className="flex items-center justify-between pb-4 border-b border-border">
                            {/* <UserInfo
                                                text="2 هفته پیش"
                                                title="حسین رستمی"
                                            /> */}
                            <div className="flex items-center gap-3">
                                <SectionLinkBtn
                                    className="h-9 text-xs text-caption"
                                    icon={<LucideCornerUpRight size={20} />}
                                    text="پاسخ"
                                />
                                <LikeButton className="w-9 h-9" count="3" />
                            </div>
                        </div>
                        <p className="text-sm mt-3">
                            من این دوره رو خریدم و میخوام نکست هم بعدا یاد بگیرم
                            چون نیاز بیشتری دارم به اموزش های این دوره میشه بدون
                            اینکه دوره نکست رو ببینم این دوره رو ببینم(بخش6دوره
                            بیشتر مد نظرمه)
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
