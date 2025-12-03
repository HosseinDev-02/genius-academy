"use client";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import SubTitle from "../SubTitle";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LucideRefreshCcw } from "lucide-react";
import { PasswordInput } from "../../forms/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/src/lib/type-definition";
import { redirect, useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

const schema = z.object({
    name: z.string().min(3, "نام باید حداقل 3 کاراکتر باشد"),
    about: z.string().optional(),
    email: z.string().optional(),
    phone_number: z.string().min(3, "نام باید حداقل 3 کاراکتر باشد"),
    password: z.string().optional(),
    repeat_password: z.string().optional(),
});

export default function UserForm({ user }: { user: User | null }) {
    if (!user) {
        redirect("/login");
    }

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: user.name,
            about: user.about || "",
            email: user.email || "",
            phone_number: user.phone_number,
            password: "",
            repeat_password: "",
        },
    });
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            if (values.email) formData.append("email", values.email);
            formData.append("phone_number", values.phone_number);
            if (values.password) formData.append("password", values.password);
            if (values.repeat_password)
                formData.append("repeat_password", values.repeat_password);
            if (values.about) formData.append("about", values.about);
            formData.append("role", user.role);

            const response = await fetch(`/api/users/${user.id}`, {
                method: "PUT",
                body: formData,
            });
            const result = await response.json();

            if (result.success) {
                toast.success(result.message);
                form.resetField("password");
                form.resetField("repeat_password");
                router.refresh();
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "خطایی رخ داد"
            );
        }
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="mt-8 space-y-5">
                        <SubTitle title="اطلاعات حساب"></SubTitle>
                        <div className="flex flex-col space-y-5">
                            <div className="grid grid-cols-2 gap-5">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                                نام کاربر
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 bg-secondary border border-border h-11 rounded-xl w-full outline-none px-2 text-title"
                                                    placeholder="نام و نام خانوادگی (فارسی)"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="form-message" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                                ایمیل
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 bg-secondary border border-border h-11 rounded-xl w-full outline-none px-2 text-title"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="form-message" />
                                        </FormItem>
                                    )}
                                />
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
                                                    className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 bg-secondary border border-border h-11 rounded-xl w-full outline-none px-2 text-title"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="form-message" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 space-y-5">
                        <SubTitle title="اطلاعات فردی"></SubTitle>
                        <FormField
                            control={form.control}
                            name="about"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        درباره من
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={20}
                                            {...field}
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-border min-h-40 resize-none bg-secondary"
                                        />
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mt-8 space-y-5">
                        <SubTitle title="تغییر رمز عبور"></SubTitle>
                        <div className="grid grid-cols-2 gap-5">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                            رمز عبور جدید
                                        </FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 bg-secondary border border-border h-11 rounded-xl w-full outline-none px-2 text-title"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="form-message" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="repeat_password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                            تکرار رمز عبور
                                        </FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 bg-secondary border border-border h-11 rounded-xl w-full outline-none px-2 text-title"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="form-message" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex sm:block mt-5">
                        <Button
                            type="submit"
                            className="float-right primary-btn"
                        >
                            <LucideRefreshCcw size={20} />
                            <span>بروزرسانی</span>
                        </Button>
                    </div>
                </form>
            </Form>
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
