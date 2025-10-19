import Input from "@/src/components/ui/Input";
import Logo from "@/src/components/ui/Logo";
import SubTitle from "@/src/components/ui/SubTitle";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { LucideArrowUpLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Register() {
    return (
        <div className="container">
            <div className="flex items-center justify-center pt-20">
                <div className="max-w-sm w-full flex flex-col space-y-10">
                    <div className="bg-gradient-to-b from-secondary to-background rounded-2xl px-5">
                        <div className="flex items-center rounded-2xl bg-background p-5">
                            <Logo />
                        </div>
                        <div className="mt-5">
                            <SubTitle title="ثبت نام" />
                            <span className="text-sm inline-block mt-3">
                                درود👋
                            </span>
                            <p className="text-sm mt-3">
                                لطفا اطلاعات زیر را کامل کنید
                            </p>
                            <form action="#" className="space-y-3 mt-3">
                                <Input
                                    element="input"
                                    className="outline-none h-11 rounded-2xl bg-secondary border border-border px-2 w-full text-title placeholder:text-sm"
                                    type="text"
                                    placeholder="نام کامل"
                                />
                                <Input
                                    element="input"
                                    className="outline-none h-11 rounded-2xl bg-secondary border border-border px-2 w-full text-title placeholder:text-sm"
                                    type="text"
                                    placeholder="شماره تلفن"
                                />
                                <Input
                                    element="input"
                                    className="outline-none h-11 rounded-2xl bg-secondary border border-border px-2 w-full text-title placeholder:text-sm"
                                    type="text"
                                    placeholder="ایمیل"
                                />
                                <Input
                                    element="input"
                                    className="outline-none h-11 rounded-2xl bg-secondary border border-border px-2 w-full text-title placeholder:text-sm"
                                    type="password"
                                    placeholder="رمز عبور"
                                />
                                <div className="flex items-center justify-between">
                                    <PrimaryButton
                                        className={`!grow-0`}
                                        icon={<LucideArrowUpLeft size={20} />}
                                        title="برو بریم"
                                    />
                                    <p className="text-xs font-YekanBakh-SemiBold">
                                        حساب کاربری دارید ؟{" "}
                                        <Link
                                            className="hover:text-primary transition-colors underline text-title"
                                            href="/login"
                                        >
                                            ورود
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="bg-secondary rounded-xl p-5 flex items-center justify-center">
                        <p className="text-xs flex items-center flex-wrap gap-1 text-center justify-center">
                            ورود شما به معنای پذیرش{" "}
                            <Link
                                className="hover:text-primary transition-colors text-title font-YekanBakh-SemiBold text-nowrap underline"
                                href="#"
                            >
                                شرایط
                            </Link>{" "}
                            و{" "}
                            <Link
                                className="hover:text-primary transition-colors text-title font-YekanBakh-SemiBold text-nowrap underline"
                                href="#"
                            >
                                قوانین حریم خصوصی
                            </Link>{" "}
                            است.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
