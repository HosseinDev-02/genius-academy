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

interface CourseForm {
    courseId?: string;
}

const formSchema = z.object({
    title: z.string().min(3, "عنوان باید حداقل ۳ حرف باشد"),
    category: z.string().min(2, "دسته‌بندی را وارد کنید"),
    price: z.any(),
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
            category: "",
            price: "",
            img: "",
        },
    });
    const [fakeData, setFakeData] = useState<Course>()

    useEffect(() => {
        if(courseId) {
            const data = courses.find(course => course.id == courseId)
            console.log('Data :', data)
            form.reset({
                title: data?.title,
                category: data?.category,
                price: data?.price,
                img: data?.img
            })
            setFakeData(data)
        }
    }, [courseId, form])

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
                                    <FormLabel>عنوان دوره</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300"
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
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>دسته‌بندی</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange} // مقدار انتخابی رو به state فرم می‌فرسته
                                            defaultValue={field.value}
                                            dir="rtl"
                                        >
                                            <SelectTrigger className="w-full focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300">
                                                <SelectValue
                                                    className="font-YekanBakh-SemiBold"
                                                    placeholder="دسته بندی"
                                                />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-900">
                                                <SelectItem value="light">
                                                    Light
                                                </SelectItem>
                                                <SelectItem value="dark">
                                                    Dark
                                                </SelectItem>
                                                <SelectItem value="system">
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
                                    <FormLabel>قیمت</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300"
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
                            name="img"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>آدرس تصویر</FormLabel>
                                    <FormControl>
                                        <Input
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
