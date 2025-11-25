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
import { createCategorySchema } from "@/src/lib/data-schemas";
import { Category } from "@/src/lib/type-definition";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import z from "zod";

type Props = {
    mode: "add" | "edit";
    categoryId?: string;
    defaultValues?: z.infer<typeof createCategorySchema>;
};

export default function CategoryForm({
    mode,
    categoryId,
    defaultValues,
}: Props) {
    const form = useForm<z.infer<typeof createCategorySchema>>({
        resolver: zodResolver(createCategorySchema),
        defaultValues:
            mode === "add"
                ? {
                      title: "",
                      short_name: "",
                  }
                : defaultValues,
    });

    const onSubmit = async (values: z.infer<typeof createCategorySchema>) => {

        const categoryData = new FormData();

        categoryData.append("title", values.title);
        categoryData.append("short_name", values.short_name);

        const method = mode === "add" ? "POST" : "PUT";
        const url =
            mode === "add"
                ? "/api/categories"
                : `/api/categories/${categoryId}`;

        try {
            const response = await fetch(url, {
                method: method,
                body: categoryData,
            });
            if (response.ok) {
                toast.success(
                    method === "POST"
                        ? "دسته بندی با موفقیت ثبت شد"
                        : "دسته بندی با موفقیت ویرایش شد"
                );
                form.reset();
            } else {
                throw new Error(
                    method === "POST"
                        ? "دسته بندی با موفقیت ثبت نشد"
                        : "دسته بندی با موفقیت ویرایش نشد"
                );
            }
        } catch (error) {
            toast.error(
                method === "POST"
                    ? "دسته بندی با موفقیت ثبت نشد"
                    : "دسته بندی با موفقیت ویرایش نشد"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        عنوان دسته بندی
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600"
                                            placeholder="فرانت اند"
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
                                            placeholder="frontend"
                                            {...field}
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
                            {categoryId
                                ? "ویرایش دسته بندی"
                                : "افزودن دسته بندی"}
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
