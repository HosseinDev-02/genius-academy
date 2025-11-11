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
import {
    getAllCourses,
    getAllUsers,
    getShortArticles,
    getShortCourses,
} from "@/src/lib/actions";
import {
    createCommentSchema,
    updateCommentSchema,
} from "@/src/lib/data-schemas";
import { Article, Comment, Course, User } from "@/src/lib/type-definition";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z, { set } from "zod";

type Props = {
    mode: "add" | "edit";
    defaultValues?: z.infer<typeof updateCommentSchema>;
    commentId?: string;
};

export default function CommentForm({ mode, defaultValues, commentId }: Props) {
    const schema = mode === "add" ? createCommentSchema : updateCommentSchema;
    const [commentTypeData, setCommentTypeData] = React.useState<
        Course[] | Article[]
    >([]);
    const [parents, setParents] = React.useState<Comment[]>([]);
    const [users, setUsers] = React.useState<User[]>([]);
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues:
            mode === "add"
                ? {
                      content: "",
                      course_id: "",
                      article_id: "",
                      user_id: "",
                      parent_id: "",
                      status: "pending",
                  }
                : defaultValues,
    });

    useEffect(() => {
        const fetchAllUsers = async () => {
            const data = await getAllUsers();
            console.log("users :", data);
            setUsers(data);
        };
        const fetchCourses = async () => {
            const data = await getShortCourses();
            console.log("courses :", data);
        };
        const fetchArticles = async () => {
            const data = await getShortArticles();
            console.log("articles :", data);
        };
        fetchCourses();
        fetchArticles();
        fetchAllUsers();
    }, []);

    const onSubmit = async (values: z.infer<typeof schema>) => {
        console.log("submit");
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
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="course_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        دوره مورد نظر
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
                                                    placeholder="محصولات"
                                                />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-none">
                                                {commentTypeData?.map(
                                                    (item) => (
                                                        <SelectItem
                                                            className="cursor-pointer hover:bg-gray-200 hover:text-title"
                                                            key={item.id}
                                                            value={item.id}
                                                        >
                                                            {item.title}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="article_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        مقاله مورد نظر
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
                                                    placeholder="محصولات"
                                                />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-none">
                                                {commentTypeData?.map(
                                                    (item) => (
                                                        <SelectItem
                                                            className="cursor-pointer hover:bg-gray-200 hover:text-title"
                                                            key={item.id}
                                                            value={item.id}
                                                        >
                                                            {item.title}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
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
                                        والد کامنت
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
                                                    placeholder="محصولات"
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
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="status"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>وضعیت کامنت</FormLabel>
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
                                                        value="pending"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    در انتظار
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center space-x-3 space-x-reverse">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="border-teal-800 border-2 ring-teal-800 text-teal-800 focus-visible:ring-teal-800"
                                                        value="approved"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    تایید شده
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-x-reverse">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="border-teal-800 border-2 ring-teal-800 text-teal-800 focus-visible:ring-teal-800"
                                                        value="rejected"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    رد شده
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
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
                            {commentId ? "ویرایش کامنت" : "افزودن کامنت"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
