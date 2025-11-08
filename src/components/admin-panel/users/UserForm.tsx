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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createUserSchema } from "@/src/lib/data-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import z from "zod";
import { PasswordInput } from "../../forms/PasswordInput";

type Props = {
    mode: "add" | "edit";
    defaultValues?: z.infer<typeof createUserSchema>;
    userId?: string;
};

export default function UserForm({ mode, defaultValues, userId }: Props) {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const form = useForm<z.infer<typeof createUserSchema>>({
        resolver: zodResolver(createUserSchema),
        defaultValues:
            mode === "add"
                ? {
                      name: "",
                      email: "",
                      password: "",
                      phone_number: "",
                      role: "user",
                      about: "",
                      image: null,
                  }
                : defaultValues,
    });

    const handleSubmit = async (values: z.infer<typeof createUserSchema>) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            if (values.email) formData.append("email", values.email);
            formData.append("role", values.role);
            formData.append("password", values.password);
            formData.append("phone_number", values.phone_number);
            if (values.about) formData.append("about", values.about);
            formData.append("image", values.image);

            const method = mode === "add" ? "POST" : "PUT";
            const url = mode === "add" ? "/api/users" : `/api/users/${userId}`;
            const response = await fetch(url, {
                method,
                body: formData,
            });
            if (response.ok) {
                toast.success(
                    mode === "add"
                        ? "کاربر با موفقیت اضافه شد"
                        : "کاربر با موفقیت ویرایش شد"
                );
                form.reset();
            } else {
                throw new Error(
                    mode === "add"
                        ? "هنگام افزودن کاربر خطایی رخ داد"
                        : "هنگام ویرایش کاربر خطایی رخ داد"
                );
            }
        } catch (error) {
            toast.error(
                mode === "add"
                    ? "هنگام افزودن کاربر خطایی رخ داد"
                    : "هنگام ویرایش کاربر خطایی رخ داد"
            );
        }
    };

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-10"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
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
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600"
                                            placeholder="دونالد ترامپ"
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
                                        <PasswordInput {...field} />
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        نقش
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange} // مقدار انتخابی رو به state فرم می‌فرسته
                                            value={field.value}
                                            dir="rtl"
                                        >
                                            <SelectTrigger className="w-full focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600">
                                                <SelectValue
                                                    className={`font-YekanBakh-SemiBold`}
                                                    placeholder="مدرس"
                                                />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-none">
                                                <SelectItem
                                                    className="cursor-pointer hover:bg-gray-200 hover:text-title"
                                                    value={"user"}
                                                >
                                                    کاربر
                                                </SelectItem>
                                                <SelectItem
                                                    className="cursor-pointer hover:bg-gray-200 hover:text-title"
                                                    value={"author"}
                                                >
                                                    نویسنده
                                                </SelectItem>
                                                <SelectItem
                                                    className="cursor-pointer hover:bg-gray-200 hover:text-title"
                                                    value={"teacher"}
                                                >
                                                    مدرس
                                                </SelectItem>
                                                <SelectItem
                                                    className="cursor-pointer hover:bg-gray-200 hover:text-title"
                                                    value={"admin"}
                                                >
                                                    ادمین
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
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
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600"
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        ایمیل
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600"
                                            placeholder="example@gmail.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        آدرس تصویر
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            ref={fileRef}
                                            className="border-zinc-600"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                console.log(e.currentTarget);
                                                field.onChange(
                                                    e.target.files?.[0]
                                                );
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                    {defaultValues && (
                                        <div className="mt-2">
                                            <Image
                                                src={defaultValues.image}
                                                width={80}
                                                height={80}
                                                alt="course image"
                                            />
                                        </div>
                                    )}
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="about"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        درباره کاربر
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={20}
                                            placeholder="معرفی مختصر کاربر ..."
                                            {...field}
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600 min-h-40 resize-none"
                                        />
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex items-center justify-center">
                        <Button
                            size={"lg"}
                            type="submit"
                            className="font-YekanBakh-SemiBold cursor-pointer"
                        >
                            {userId ? "ویرایش کاربر" : "افزودن کاربر"}
                        </Button>
                    </div>
                </form>
            </Form>
            <Toaster
                position="top-center"
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
