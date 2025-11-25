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
import {
    createCommentSchema,
    updateCommentSchema,
} from "@/src/lib/data-schemas";
import { getShortArticles } from "@/src/lib/storage/articles";
import { getAllComments } from "@/src/lib/storage/comments";
import { getShortCourses } from "@/src/lib/storage/courses";
import { getAdminUsers } from "@/src/lib/storage/users";
import {
    Article,
    Comment,
    CommentWithRelations,
    Course,
    User,
} from "@/src/lib/type-definition";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import z, { set } from "zod";

type Props = {
    mode: "add" | "edit";
    defaultValues?: z.infer<typeof updateCommentSchema>;
    commentId?: string;
    course_id?: string | null;
    article_id?: string | null;
    parent_id?: string | null;
};

export default function CommentForm({
    mode,
    defaultValues,
    commentId,
    course_id,
    article_id,
    parent_id,
}: Props) {
    const schema = mode === "add" ? createCommentSchema : updateCommentSchema;
    const [parents, setParents] = React.useState<CommentWithRelations[]>([]);
    const [articles, setArticles] = React.useState<Article[]>([]);
    const [courses, setCourses] = React.useState<Course[]>([]);
    const [users, setUsers] = React.useState<User[]>([]);
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues:
            mode === "add"
                ? {
                      content: "",
                      article_id,
                      course_id,
                      parent_id,
                      user_id: "",
                      status: "pending",
                      target_type: "course",
                  }
                : defaultValues,
    });
    const commentType = form.watch("target_type");

    useEffect(() => {
        const fetchAllUsers = async () => {
            const data = await getAdminUsers();
            setUsers(data);
        };
        const fetchCourses = async () => {
            const data = await getShortCourses();
            setCourses(data);
        };
        const fetchArticles = async () => {
            const data = await getShortArticles();
            setArticles(data);
        };
        const fetchComments = async () => {
            const data = await getAllComments();
            setParents(data);
        };
        fetchAllUsers();
        fetchComments();
        fetchCourses();
        fetchArticles();
    }, []);

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            const formData = new FormData();
            formData.append("content", values.content);
            formData.append("user_id", values.user_id);
            if (values.parent_id)
                formData.append("parent_id", values.parent_id);
            if (values.course_id)
                formData.append("course_id", values.course_id);
            if (values.article_id)
                formData.append("article_id", values.article_id);
            const method = mode === "add" ? "POST" : "PUT";
            const url =
                mode === "add" ? "/api/comments" : `/api/comments/${commentId}`;
            const response = await fetch(url, {
                method: method,
                body: formData,
            });
            if (response.ok) {
                toast.success(
                    mode === "add"
                        ? "کامنت با موفقیت ثبت شد"
                        : "کامنت با موفقیت ویرایش شد"
                );
            } else {
                throw new Error(
                    mode === "add"
                        ? "Failed To Add Comment"
                        : "Failed To Edit Comment"
                );
            }
        } catch (error) {
            toast.error(
                mode === "add"
                    ? "هنگام افزودن کامنت خطایی رخ داد"
                    : "هنگام ویرایش کامنت خطایی رخ داد"
            );
        }
    };
    return (
        <div>
            <Form {...form}>
                <form
                    className="space-y-10"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <FormField
                            control={form.control}
                            name="user_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        کاربر
                                    </FormLabel>
                                    <FormControl>
                                        {users.length !== 0 && (
                                            <Select
                                                onValueChange={field.onChange} // مقدار انتخابی رو به state فرم می‌فرسته
                                                value={field.value}
                                                dir="rtl"
                                            >
                                                <SelectTrigger className="w-full focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600">
                                                    <SelectValue
                                                        className={`font-YekanBakh-SemiBold`}
                                                        placeholder="حسین رستمی"
                                                    />
                                                </SelectTrigger>
                                                <SelectContent className="bg-zinc-800 border-none">
                                                    {users?.map((user) => (
                                                        <SelectItem
                                                            className="cursor-pointer hover:bg-gray-200 hover:text-title"
                                                            key={user.id}
                                                            value={user.id}
                                                        >
                                                            {user.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="parent_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        والد کامنت (اختیاری)
                                    </FormLabel>
                                    <FormControl>
                                        {parents.length !== 0 && (
                                            <Select
                                                onValueChange={field.onChange} // مقدار انتخابی رو به state فرم می‌فرسته
                                                value={field.value || ""}
                                                dir="rtl"
                                            >
                                                <SelectTrigger className="w-full focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600">
                                                    <SelectValue
                                                        className={`font-YekanBakh-SemiBold`}
                                                        placeholder="انتخاب کامنت برای پاسخ"
                                                    />
                                                </SelectTrigger>
                                                <SelectContent className="bg-zinc-800 border-none">
                                                    {parents?.map((parent) => (
                                                        <SelectItem
                                                            className="cursor-pointer hover:bg-gray-200 hover:text-title"
                                                            key={parent.id}
                                                            value={parent.id}
                                                        >
                                                            {parent.content}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        متن کامنت
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={20}
                                            placeholder="متن کامنت ..."
                                            {...field}
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600 min-h-40 resize-none"
                                        />
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col justify-between h-full">
                            <FormField
                                name="target_type"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>نوع کامنت</FormLabel>
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
                                                            value="article"
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        مقاله
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-x-reverse">
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            className="border-teal-800 border-2 ring-teal-800 text-teal-800 focus-visible:ring-teal-800"
                                                            value="course"
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        دوره
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage className="form-message" />
                                    </FormItem>
                                )}
                            />
                            {commentType === "course" ? (
                                <FormField
                                    control={form.control}
                                    name="course_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                                دوره مورد نظر
                                            </FormLabel>
                                            <FormControl>
                                                {courses.length !== 0 && (
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        } // مقدار انتخابی رو به state فرم می‌فرسته
                                                        value={
                                                            field.value || ""
                                                        }
                                                        dir="rtl"
                                                    >
                                                        <SelectTrigger className="w-full focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600">
                                                            <SelectValue
                                                                className={`font-YekanBakh-SemiBold`}
                                                                placeholder="محصولات"
                                                            />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-zinc-800 border-none">
                                                            {courses?.map(
                                                                (course) => (
                                                                    <SelectItem
                                                                        className="cursor-pointer hover:bg-gray-200 hover:text-title"
                                                                        key={
                                                                            course.id
                                                                        }
                                                                        value={
                                                                            course.id
                                                                        }
                                                                    >
                                                                        {
                                                                            course.title
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            </FormControl>
                                            <FormMessage className="form-message" />
                                        </FormItem>
                                    )}
                                />
                            ) : (
                                <FormField
                                    control={form.control}
                                    name="article_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                                مقاله مورد نظر
                                            </FormLabel>
                                            <FormControl>
                                                {articles.length !== 0 && (
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        } // مقدار انتخابی رو به state فرم می‌فرسته
                                                        value={
                                                            field.value || ""
                                                        }
                                                        dir="rtl"
                                                    >
                                                        <SelectTrigger className="w-full focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600">
                                                            <SelectValue
                                                                className={`font-YekanBakh-SemiBold`}
                                                                placeholder="محصولات"
                                                            />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-zinc-800 border-none">
                                                            {articles?.map(
                                                                (article) => (
                                                                    <SelectItem
                                                                        className="cursor-pointer hover:bg-gray-200 hover:text-title"
                                                                        key={
                                                                            article.id
                                                                        }
                                                                        value={
                                                                            article.id
                                                                        }
                                                                    >
                                                                        {
                                                                            article.title
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            </FormControl>
                                            <FormMessage className="form-message" />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Button
                            size={"lg"}
                            type="submit"
                            className="font-YekanBakh-SemiBold cursor-pointer"
                        >
                            {commentId ? "ویرایش کامنت" : "افزودن کامنت"}
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
