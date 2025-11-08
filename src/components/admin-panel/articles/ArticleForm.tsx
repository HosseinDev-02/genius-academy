"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { Category, User, getAllCategories } from "@/src/lib/actions";
import { Toaster, toast } from "sonner";
import TiptapEditor, { EditorRef } from "../Editor";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
    createArticleSchema,
    updateArticleSchema,
} from "@/src/lib/data-schemas";
import { Course } from "@/src/lib/type-definition";

interface Props {
    articleId?: string;
    mode: "add" | "edit";
    defaultValues?: z.infer<typeof updateArticleSchema>;
}

export default function ArticleForm({ articleId, mode, defaultValues }: Props) {
    const schema = mode === "add" ? createArticleSchema : updateArticleSchema;
    const fileRef = useRef<HTMLInputElement | null>(null);
    const editorRef = useRef<EditorRef>(null);
    const [authors, setAuthors] = useState<User[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch("/api/users/authors")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("authors response :", data);
                setAuthors(data);
            });
        fetch("/api/categories")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCategories(data);
            });
    }, []);

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
                      short_name: "",
                      time_read: "",
                      image: null,
                      content: {},
                  },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("time_read", values.time_read);
        formData.append("about", values.about);
        formData.append("category_id", values.category_id);
        formData.append("user_id", values.user_id);
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

        console.log("values :", values);

        const method = mode === "add" ? "POST" : "PUT";
        const url =
            mode === "add" ? "/api/articles" : `/api/articles/${articleId}`;

        try {
            const res = await fetch(url, {
                method: method,
                body: formData,
            });
            console.log(res);
            if (res.ok) {
                form.reset();
                fileRef.current!.value = "";
                editorRef.current?.reset();
                toast.success(
                    method === "POST"
                        ? "مقاله با موفقیت افزوده شد"
                        : "مقاله با موفقیت ویرایش شد"
                );
            } else {
                throw new Error(
                    method === "POST"
                        ? "مقاله با موفقیت افزوده نشد"
                        : "مقاله با موفقیت ویرایش نشد"
                );
            }
        } catch (error) {
            toast.error(
                method === "POST"
                    ? "مقاله با موفقیت افزوده نشد"
                    : "مقاله با موفقیت ویرایش نشد"
            );
            return {
                massage:
                    method === "POST"
                        ? "DATABASE ERROR WHILE CREATING COURSE"
                        : "DATABASE ERROR WHILE UPDATAING COURSE",
            };
        }
    };

    return (
        <div>
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
                                        عنوان مقاله
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
                                        نویسنده مقاله
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
                                                    placeholder="نویسنده مقاله"
                                                />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-none">
                                                {authors?.map((author) => (
                                                    <SelectItem
                                                        className="cursor-pointer hover:bg-gray-200 hover:text-title"
                                                        key={author.id}
                                                        value={author.id}
                                                    >
                                                        {author.name}
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
                            name="time_read"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        زمان خواندن
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600"
                                            placeholder="30"
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
                                        درباره مقاله
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={20}
                                            placeholder="توضیحات مختصر مقاله ..."
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
                                <FormLabel>توضیحات / محتوای مقاله</FormLabel>
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
                            {articleId ? "ویرایش مقاله" : "افزودن مقاله"}
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
