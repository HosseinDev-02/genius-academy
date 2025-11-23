"use client";
import React from "react";
import { useAuthContext } from "../../layout/LayoutProvider";
import SubTitle from "../../ui/SubTitle";
import PrimaryButton from "../../ui/button/PrimaryButton";
import { LucideArrowUpLeft } from "lucide-react";

export default function CourseCommentForm() {
    const { user } = useAuthContext();
    return (
        <div>
            {user ? (
                <div className="p-5 rounded-3xl my-5 border border-border">
                    <SubTitle
                        className="text-xs"
                        title="ارسال دیدگاه یا پرسش"
                    ></SubTitle>
                    <div className="flex items-end md:items-center flex-wrap gap-y-5 justify-between my-5">
                        <div className="flex md:flex-row flex-col items-start md:items-center gap-3">
                            {/* <UserInfo
                                  text="دوهفته پیش"
                                  title="حسین رستمی"
                              /> */}
                            <div className="flex items-center gap-3">
                                <span className="bg-secondary w-1 h-1 rounded-full"></span>
                                <span className="text-xs">در پاسخ به</span>
                                <span className="bg-secondary w-1 h-1 rounded-full"></span>
                                <span className="text-sm font-YekanBakh-SemiBold text-title">
                                    حسین رستمی
                                </span>
                            </div>
                        </div>
                        <button className="text-red-500 font-YekanBakh-SemiBold text-sm">
                            لغو پاسخ
                        </button>
                    </div>
                    <form className="flex flex-col items-end gap-5" action="#">
                        <textarea
                            rows={10}
                            placeholder="متن مورد نظر خود را وارد کنید ..."
                            className="p-5 bg-secondary rounded-xl text-sm text-title overflow-hidden w-full outline-none"
                        ></textarea>
                        <PrimaryButton
                            title="ثبت دیدگاه یا پرسش"
                            icon={<LucideArrowUpLeft size={20} />}
                            href="#"
                        />
                    </form>
                </div>
            ) : (
                <h3 className="font-YekanBakh-SemiBold text-title my-5">برای ارسال دیدگاه و پرسش باید وارد شوید</h3>
            )}
        </div>
    );
}
