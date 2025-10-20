import NotificationIcon from "@/src/components/icon/NotificationIcon";
import Input from "@/src/components/ui/Input";
import SubTitle from "@/src/components/ui/SubTitle";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { LucideFileText, LucideKeyRound, LucidePenSquare, LucideRefreshCcw } from "lucide-react";
import React from "react";

export default function Edit() {
    return (
        <div>
            <div className="my-5">
                <SubTitle title="ویرایش پروفایل"></SubTitle>
                <div className="overflow-x-auto">
                    <ul className="bg-secondary rounded-full inline-flex items-center gap-5 border border-border p-1 mt-5">
                        <li>
                            <button className="flex items-center gap-2 h-10 rounded-full px-5 hover:bg-background hover:text-title transition-colors user-edit-menu__item--active">
                                <LucidePenSquare size={20}/>
                                <span className="text-sm font-YekanBakh-Bold text-nowrap">
                                    اطلاعات حساب
                                </span>
                            </button>
                        </li>
                        <li>
                            <button className="flex items-center gap-2 h-10 rounded-full px-5 hover:bg-background hover:text-title transition-colors">
                                <LucideFileText size={20}/>
                                <span className="text-sm font-YekanBakh-Bold text-nowrap">
                                    شماره موبایل
                                </span>
                            </button>
                        </li>
                        <li>
                            <button className="flex items-center gap-2 h-10 rounded-full px-5 hover:bg-background hover:text-title transition-colors">
                                <LucideKeyRound size={20}/>
                                <span className="text-sm font-YekanBakh-Bold text-nowrap">
                                    رمز عبور
                                </span>
                            </button>
                        </li>
                        <li>
                            <button className="flex items-center gap-2 h-10 rounded-full px-5 hover:bg-background hover:text-title transition-colors">
                                <NotificationIcon className="w-5 h-5"/>
                                <span className="text-sm font-YekanBakh-Bold text-nowrap">
                                    اطلاع رسانی
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 space-y-5">
                <SubTitle title="اطلاعات حساب"></SubTitle>
                <div className="flex flex-col space-y-5">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-5">
                        <div className="w-full sm:w-1/2 flex flex-col gap-2 items-start">
                            <Input
                                label={true}
                                labelTitle="نام و نام خانوادگی (فارسی)"
                                className="bg-secondary border border-border h-11 rounded-xl w-full outline-none px-2 text-title"
                                type="text"
                                element="input"
                            />
                        </div>
                        <div className="w-full sm:w-1/2 flex flex-col gap-2 items-start">
                            <Input
                                label={true}
                                labelTitle="ایمیل"
                                className="bg-secondary border border-border h-11 rounded-xl w-full outline-none px-2 text-title"
                                type="text"
                                element="input"
                            />
                        </div>
                    </div>
                    <div className="lg:w-1/2 flex flex-col gap-2 items-start">
                        <Input
                            label={true}
                            labelTitle="آدرس پروفایل"
                            className="bg-secondary border border-border h-11 rounded-xl w-full outline-none px-2 text-title"
                            type="text"
                            element="input"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <SubTitle title="اطلاعات فردی"></SubTitle>
                <div className="flex flex-col items-start gap-2">
                    <div className="flex flex-col gap-2 w-full mt-5">
                        <Input
                            label={true}
                            labelTitle="درباره من"
                            element="textarea"
                            className="bg-secondary rounded-xl border border-border text-title outline-none overflow-hidden p-3 w-full h-36"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-8 mb-5">
                <SubTitle title="راه های ارتباطی"></SubTitle>
                <div className="sm:grid sm:grid-cols-2 sm:gap-5 space-y-5 sm:space-y-0 mt-5">
                    <Input
                        label={true}
                        labelTitle="وب سایت"
                        className="bg-secondary border border-border h-11 rounded-xl w-full outline-none px-2 text-title"
                        type="text"
                        element="input"
                        dir="ltr"
                    />
                    <Input
                        label={true}
                        labelTitle="گیت هاب"
                        className="bg-secondary border border-border h-11 rounded-xl w-full outline-none px-2 text-title"
                        type="text"
                        element="input"
                        dir="ltr"
                    />
                    <Input
                        label={true}
                        labelTitle="لینکدین"
                        className="bg-secondary border border-border h-11 rounded-xl w-full outline-none px-2 text-title"
                        type="text"
                        element="input"
                        dir="ltr"
                    />
                    <Input
                        label={true}
                        labelTitle="تلگرام"
                        className="bg-secondary border border-border h-11 rounded-xl w-full outline-none px-2 text-title"
                        type="text"
                        element="input"
                        dir="ltr"
                    />
                </div>
            </div>
            <div className="flex sm:block">
                <PrimaryButton
                    className="float-right"
                    icon={<LucideRefreshCcw size={20}/>}
                    href="#"
                    title="بروزرسانی"
                ></PrimaryButton>
            </div>
        </div>
    );
}
