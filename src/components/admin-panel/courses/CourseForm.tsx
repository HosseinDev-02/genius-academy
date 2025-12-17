"use client";
import React, { useEffect, useRef, useState } from "react";
import { UploadButton } from "@bytescale/upload-widget-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toaster, toast } from "sonner";
import TiptapEditor, { EditorRef } from "../Editor";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { createCourseSchema, updateCourseSchema } from "@/src/lib/data-schemas";
import { Category, Course, User } from "@/src/lib/type-definition";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/src/lib/utils/uploadImage";

interface CourseForm {
    courseId?: string;
    mode: "add" | "edit";
    defaultValues?: z.infer<typeof updateCourseSchema>;
    teachers: User[];
    categories: Category[];
}

export default function CourseForm({
    courseId,
    mode,
    defaultValues,
    teachers,
    categories
}: CourseForm) {
    const schema = mode === "add" ? createCourseSchema : updateCourseSchema;
    const fileRef = useRef<HTMLInputElement | null>(null);
    const editorRef = useRef<EditorRef>(null);
    // const [teachers, setTeachers] = useState<User[]>([]);
    // const [categories, setCategories] = useState<Category[]>([]);
    const router = useRouter();
    const [uploading, setUploading] = React.useState(false);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues:
            mode === "edit"
                ? defaultValues
                : {
                      title: "",
                      about: "",
                      user_id: "",
                      category_id: "",
                      price: 0,
                      short_name: "",
                      is_completed: "inProgress",
                      image: null,
                      content: {},
                  },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("about", values.about);
        formData.append("price", values.price.toString());
        formData.append("category_id", values.category_id);
        formData.append("user_id", values.user_id);
        formData.append("is_completed", values.is_completed);
        formData.append("short_name", values.short_name);
        formData.append("image", values.image);
        formData.append("content", JSON.stringify(values.content));

        for (const key in values) {
            const val = values[key as keyof typeof values];
            if (key === "image") {
                if (val instanceof File) formData.append("image", val);
            } else {
                formData.append(key, JSON.stringify(val));
            }
        }

        const method = mode === "add" ? "POST" : "PUT";
        const url =
            mode === "add" ? "/api/courses" : `/api/courses/${courseId}`;

        try {
            const res = await fetch(url, {
                method: method,
                body: formData,
            });
            const result = await res.json();
            if (res.ok) {
                if (method === "POST") {
                    form.reset();
                    fileRef.current!.value = "";
                    editorRef.current?.reset();
                }
                if (method === "PUT") {
                    router.refresh();
                }
                toast.success(result.message);
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "خطایی رخ داد"
            );
        }
    };

    // useEffect(() => {
    //     fetch("/api/courses/teachers")
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((data) => {
    //             setTeachers(data);
    //         });
    //     fetch("/api/categories")
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((data) => {
    //             setCategories(data.data);
    //         });
    // }, []);

    return (
        <div dir="rtl">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-10"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
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
                                    <FormMessage className="form-message" />
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
                                            value={field.value}
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
                                    <FormMessage className="form-message" />
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
                                            value={field.value}
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
                                    <FormMessage className="form-message" />
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
                                    <FormMessage className="form-message" />
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
                                            onChange={async (e) => {
                                                const file =
                                                    e.target.files?.[0];
                                                if (!file) return;

                                                // محدودیت حجم (مثلاً 5MB)
                                                if (
                                                    file.size >
                                                    5 * 1024 * 1024
                                                ) {
                                                    alert(
                                                        "حجم تصویر نباید بیشتر از 5MB باشد"
                                                    );
                                                    return;
                                                }

                                                const url =
                                                    await uploadImage(
                                                        file,
                                                        setUploading
                                                    );
                                                form.setValue("image", url, {
                                                    shouldValidate: true,
                                                });
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
                                                priority
                                            />
                                        </div>
                                    )}
                                    {uploading && (
                                        <p className="text-sm text-blue-500">
                                            در حال آپلود تصویر...
                                        </p>
                                    )}
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
                                            value={field.value}
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
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="about"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        درباره دوره
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={20}
                                            placeholder="توضیحات مختصر دوره ..."
                                            {...field}
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600 min-h-40 resize-none"
                                        />
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>توضیحات / محتوای دوره</FormLabel>
                                <Controller
                                    name="content"
                                    control={form.control}
                                    render={({ field }) => (
                                        <TiptapEditor
                                            value={
                                                field.value || {
                                                    type: "doc",
                                                    content: [],
                                                }
                                            }
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                                <FormMessage className="form-message" />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center justify-center">
                        <Button
                            size={"lg"}
                            type="submit"
                            className="font-YekanBakh-SemiBold cursor-pointer"
                        >
                            {courseId ? "ویرایش دوره" : "افزودن دوره"}
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
