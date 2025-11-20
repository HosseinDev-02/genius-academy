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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { revalidate } from "@/src/app/admin-panel/articles/page";
import {
    createSubSubmenuSchema,
    updateSubSubmenuSchema,
} from "@/src/lib/data-schemas";
import { SubMenu } from "@/src/lib/type-definition";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidateTag } from "next/cache";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import z from "zod";

type Props = {
    mode: "add" | "edit";
    defaultValues?: z.infer<typeof updateSubSubmenuSchema>;
    subSubmenuId?: string;
};

export default function SubSubmenuForm({
    mode,
    defaultValues,
    subSubmenuId,
}: Props) {
    const schema =
        mode === "add" ? createSubSubmenuSchema : updateSubSubmenuSchema;
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues:
            mode === "add"
                ? {
                      title: "",
                      url: "",
                      order_index: 0,
                      submenu_id: "",
                  }
                : { ...defaultValues },
    });
    const [submenus, setSubmenus] = useState<SubMenu[]>([]);

    useEffect(() => {
        const fetchSubmenus = async () => {
            const response = await fetch("/api/submenus");
            const data = await response.json();
            console.log("submenus :", data);
            setSubmenus(data);
        };
        fetchSubmenus();
    }, []);

    const handleSubmit = async (values: z.infer<typeof schema>) => {
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("url", values.url);
            formData.append("order_index", values.order_index.toString());
            formData.append("submenu_id", values.submenu_id);

            const method = mode === "add" ? "POST" : "PUT";
            const url =
                mode === "add"
                    ? "/api/sub-submenus"
                    : `/api/sub-submenus/${subSubmenuId}`;

            const response = await fetch(url, {
                method: method,
                body: formData,
            });

            console.log('response :', response);

            if(response.ok) {
                toast.success(
                    mode === "add"
                        ? "زیرمنو فرعی با موفقیت افزوده شد"
                        : "زیرمنو فرعی با موفقیت ویرایش شد"
                );
                form.reset()
            }else {
                throw new Error(
                    mode === "add"
                        ? "هنگام ثبت زیرمنو فرعی خطایی رخ داد"
                        : "هنگام ویرایش زیرمنو فرعی خطایی رخ داد"
                );
            }
        } catch (error) {
            toast.error(
                mode === "add"
                    ? "هنگام ثبت زیرمنو فرعی خطایی رخ داد"
                    : "هنگام ویرایش زیرمنو فرعی خطایی رخ داد"
            );
        }
    };

    return (
        <div dir="rtl">
            <Form {...form}>
                <form
                    className="space-y-10"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        عنوان زیرمنو فرعی
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600"
                                            placeholder="محصولات"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        لینک
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            dir="ltr"
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600"
                                            placeholder="/courses"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="order_index"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        اولویت
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600"
                                            placeholder="2"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="submenu_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        زیرمنو والد
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
                                                {submenus?.map((submenu) => (
                                                    <SelectItem
                                                        className="cursor-pointer hover:bg-gray-200 hover:text-title"
                                                        key={submenu.id}
                                                        value={submenu.id}
                                                    >
                                                        {submenu.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                            {subSubmenuId ? "ویرایش زیرمنو" : "افزودن زیرمنو"}
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
