"use client";
import React, { useEffect, useState } from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";
import { Course } from "@/src/lib/definition";
import { courses } from "@/src/lib/placeholder-data";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Category, User, getAllCategories } from "@/src/lib/actions";
import { Params } from "next/dist/server/request/params";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { Toaster, toast } from "sonner";

interface CourseForm {
    courseId?: string;
    categories: Category[];
    teachers: User[];
}

const formSchema = z
    .object({
        title: z.string().min(3, "عنوان باید حداقل ۳ حرف باشد"),
        user_id: z.string().min(2, "مدرس را انتخاب کنید"),
        category_id: z.string().min(2, "دسته‌بندی را وارد کنید"),
        price: z.coerce.number(),
        short_name: z.string().min(3, "نام کوتاه باید حداقل ۳ حرف باشد"),
        is_completed: z.enum(["isCompleted", "inProgress"]),
        image: z
            .any()
            .refine(
                (file) => file instanceof File,
                "لطفاً یک تصویر انتخاب کنید"
            ),
    })
    .transform((data) => ({
        ...data,
        is_completed: data.is_completed === "isCompleted",
    }));

export default function CourseForm({
    courseId,
    categories,
    teachers,
}: CourseForm) {
    console.log("categories :", categories);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            user_id: "",
            category_id: "",
            price: 0,
            short_name: "",
            is_completed: false,
            image: null,
        },
    });

    // useEffect(() => {
    //     if (courseId) {
    //         const data = courses.find((course) => course.id == courseId);
    //         console.log("Data :", data);
    //         form.reset({
    //             title: data?.title,
    //             category: data?.category,
    //             teacher: data?.teacher,
    //             price: data?.price,
    //             img: data?.img,
    //         });
    //         setFakeData(data);
    //     }
    // }, [courseId, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("price", values.price.toString());
        formData.append("category_id", values.category_id);
        formData.append("user_id", values.user_id);
        formData.append("is_completed", values.is_completed ? "true" : "false");
        formData.append("short_name", values.short_name);
        formData.append("image", values.image);

        console.log(values);

        try {
            const res = await fetch("/api/courses", {
                method: "POST",
                body: formData,
            });
            console.log(res);
            if(res.ok) {
                toast.success("دوره با موفقیت افزوده شد");
            }
            else {
                throw new Error('هنگام افزودن دوره خطایی رخ داد');
            }
        } catch (error) {
            console.log(error);
            toast.error("هنگام افزودن دوره خطایی رخ داد");
            return {
                massage: "DATABASE ERROR WHILE CREATING COURSE",
            };
        }
    };

    return (
        <div>
            {/* <Button
                className="bg-primary"
                onClick={() => toast.success("دوره با موفقیت افزوده شد")}
            >
                Success
            </Button>
            <Button
                className="bg-primary"
                onClick={() => toast.error("هنگام افزودن دوره خطایی رخ داد")}
            >
                Error
            </Button> */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="grid grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        عنوان دوره
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600"
                                            placeholder="آموزش React"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="user_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        مدرس دوره
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange} // مقدار انتخابی رو به state فرم می‌فرسته
                                            defaultValue={field.value}
                                            dir="rtl"
                                        >
                                            <SelectTrigger className="w-full focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600">
                                                <SelectValue
                                                    className={`font-YekanBakh-SemiBold`}
                                                    placeholder="مدرس دوره"
                                                />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-none">
                                                {teachers?.map((teacher) => (
                                                    <SelectItem
                                                        className="cursor-pointer hover:bg-gray-200 hover:text-title"
                                                        key={teacher.id}
                                                        value={teacher.id}
                                                    >
                                                        {teacher.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        دسته‌بندی
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange} // مقدار انتخابی رو به state فرم می‌فرسته
                                            defaultValue={field.value}
                                            dir="rtl"
                                        >
                                            <SelectTrigger className="w-full focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600">
                                                <SelectValue
                                                    className={`font-YekanBakh-SemiBold`}
                                                    placeholder="دسته بندی"
                                                />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-none">
                                                {categories?.map((category) => (
                                                    <SelectItem
                                                        className="cursor-pointer hover:bg-gray-200 hover:text-title"
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        قیمت
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600"
                                            placeholder="200000"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="short_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        نام کوتاه
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600"
                                            placeholder="react-js"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="is_completed"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>وضعیت دوره</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            dir="rtl"
                                            onValueChange={field.onChange} // 👈 اتصال به فرم
                                            defaultValue={field.value}
                                            className="course-status flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-x-reverse">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="border-teal-800 border-2 ring-teal-800 text-teal-800 focus-visible:ring-teal-800"
                                                        value="isCompleted"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    تکمیل شده
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center space-x-3 space-x-reverse">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="border-teal-800 border-2 ring-teal-800 text-teal-800 focus-visible:ring-teal-800"
                                                        value="inProgress"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    درحال برگزاری
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
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
                            افزودن دوره
                        </Button>
                    </div>
                </form>
            </Form>
            <Toaster position="top-center" toastOptions={{ duration: 2500, classNames:{success: "!bg-teal-700", error: "!bg-red-700",} , className: "!text-white !border-none", }}/>
        </div>
    );
}
