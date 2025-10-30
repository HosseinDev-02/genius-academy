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

interface CourseForm {
    courseId?: string;
}

const formSchema = z.object({
    title: z.string().min(3, "عنوان باید حداقل ۳ حرف باشد"),
    teacher: z.string().min(2, "مدرس را انتخاب کنید"),
    category: z.string().min(2, "دسته‌بندی را وارد کنید"),
    price: z.any(),
    shortName: z.string().min(3, "نام کوتاه باید حداقل ۳ حرف باشد"),
    is_completed: z.string().default('isCompleted'),
    img: z
        .any()
        .refine((file) => file?.length === 1, "تصویر الزامی است")
        .refine(
            (file) => file?.[0]?.type?.startsWith("image/"),
            "فایل انتخاب‌شده باید تصویر باشد"
        ),
});

export default function CourseForm({ courseId }: CourseForm) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            teacher: "",
            category: "",
            price: "",
            shortName: "",
            is_completed: '',
            img: "",
        },
    });
    const [fakeData, setFakeData] = useState<Course>();

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

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const id = uuidv4();
        console.log({ ...values, id });
        // اینجا می‌تونی درخواست POST به API ارسال کنی
    };

    return (
        <div>
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
                            name="teacher"
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
                                                <SelectItem
                                                    className="cursor-pointer"
                                                    value="light"
                                                >
                                                    Light
                                                </SelectItem>
                                                <SelectItem
                                                    className="cursor-pointer"
                                                    value="dark"
                                                >
                                                    Dark
                                                </SelectItem>
                                                <SelectItem
                                                    className="cursor-pointer"
                                                    value="system"
                                                >
                                                    System
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
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
                                                <SelectItem
                                                    className="cursor-pointer"
                                                    value="light"
                                                >
                                                    Light
                                                </SelectItem>
                                                <SelectItem
                                                    className="cursor-pointer"
                                                    value="dark"
                                                >
                                                    Dark
                                                </SelectItem>
                                                <SelectItem
                                                    className="cursor-pointer"
                                                    value="system"
                                                >
                                                    System
                                                </SelectItem>
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
                            name="shortName"
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
                            name="img"
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
                                            onChange={(e) =>
                                                field.onChange(e.target.files)
                                            }
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
                                    <RadioGroup dir="rtl"
                                      onValueChange={field.onChange} // 👈 اتصال به فرم
                                      defaultValue={field.value}
                                      className="course-status flex flex-col space-y-1"
                                    >
                                      <FormItem className="flex items-center space-x-3 space-x-reverse">
                                        <FormControl>
                                          <RadioGroupItem className="border-teal-800 border-2 ring-teal-800 text-teal-800 focus-visible:ring-teal-800" value="isCompleted" />
                                        </FormControl>
                                        <FormLabel className="font-normal">تکمیل شده</FormLabel>
                                      </FormItem>
                    
                                      <FormItem className="flex items-center space-x-3 space-x-reverse">
                                        <FormControl>
                                          <RadioGroupItem className="border-teal-800 border-2 ring-teal-800 text-teal-800 focus-visible:ring-teal-800" value="inProgress" />
                                        </FormControl>
                                        <FormLabel className="font-normal">درحال برگزاری</FormLabel>
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
        </div>
    );
}
