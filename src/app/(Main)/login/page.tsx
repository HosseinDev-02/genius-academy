"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/src/components/forms/PasswordInput";
import Logo from "@/src/components/ui/Logo";
import SubTitle from "@/src/components/ui/SubTitle";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpLeft, LucideArrowUpLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import z from "zod";
import jwt from "jsonwebtoken";
import { useAuth } from "@/src/store/auth";
import { useRouter } from "next/navigation";

const schema = z.object({
    phone_number: z.string().min(11, "شماره موبایل باید 11 رقم باشد"),
    password: z.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
});

export default function Login() {
    const router = useRouter()
    const { setUser } = useAuth()
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            phone_number: "",
            password: "",
        },
    });

    const loginHandler = async (values: z.infer<typeof schema>) => {
        try {
            const loginInfo = {
                phone_number: values.phone_number,
                password: values.password,
            };

            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginInfo),
            });
            const result = await response.json();

            const decoded: any = jwt.decode(result.token);
            setUser(decoded)

            if (result.success) {
                toast.success("ورود با موفقیت انجام شد");
                form.reset();
                router.push("/")
            } else {
                throw new Error("هنگام ورود خطایی رخ داد");
            }
        } catch (error) {
            toast.error("هنگام ورود خطایی رخ داد");
        }
    };

    return (
        <div className="container">
            <div className="flex items-center justify-center pt-20">
                <div className="max-w-sm w-full flex flex-col space-y-10">
                    <div className="bg-gradient-to-b from-secondary to-background rounded-2xl px-5">
                        <div className="flex items-center rounded-2xl bg-background p-5">
                            <Logo />
                        </div>
                        <div className="mt-5">
                            <SubTitle title="ورود" />
                            <span className="text-sm inline-block mt-3">
                                درود👋
                            </span>
                            <p className="text-sm mt-3">
                                لطفا اطلاعات زیر را وارد کنید
                            </p>
                            <Form {...form}>
                                <form
                                    className="space-y-3"
                                    onSubmit={form.handleSubmit(
                                        loginHandler,
                                        (error) => {
                                            console.log(error);
                                        }
                                    )}
                                >
                                    <div className="grid grid-cols-1 gap-3 items-start">
                                        <FormField
                                            control={form.control}
                                            name="phone_number"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                                        شماره تماس
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 outline-none h-11 rounded-2xl bg-secondary border border-border px-2 w-full text-title placeholder:text-sm"
                                                            placeholder="09123456789"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="form-message" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                                        رمز عبور
                                                    </FormLabel>
                                                    <FormControl>
                                                        <PasswordInput
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="form-message" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Button
                                            type="submit"
                                            className="flex sm:inline-flex items-center justify-center gap-2 bg-primary rounded-full text-white h-11 transition-opacity hover:opacity-80 font-YekanBakh-SemiBold text-xs xl:text-sm px-4 cursor-pointer"
                                        >
                                            <span>برو بریم</span>
                                            <ArrowUpLeft size={24} />
                                        </Button>
                                        <p className="text-xs font-YekanBakh-SemiBold">
                                            حساب کاربری ندارید ؟{" "}
                                            <Link
                                                className="hover:text-primary transition-colors underline text-title"
                                                href="/register"
                                            >
                                                ثبت نام
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                    <div className="bg-secondary rounded-xl p-5 flex items-center justify-center">
                        <p className="text-xs flex items-center flex-wrap gap-1 text-center justify-center">
                            ورود شما به معنای پذیرش{" "}
                            <Link
                                className="hover:text-primary transition-colors text-title font-YekanBakh-SemiBold text-nowrap"
                                href="#"
                            >
                                شرایط
                            </Link>{" "}
                            و{" "}
                            <Link
                                className="hover:text-primary transition-colors text-title font-YekanBakh-SemiBold text-nowrap"
                                href="#"
                            >
                                قوانین حریم خصوصی
                            </Link>{" "}
                            است.
                        </p>
                    </div>
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
        </div>
    );
}
