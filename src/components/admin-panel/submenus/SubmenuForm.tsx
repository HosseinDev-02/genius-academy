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
import { createMenuSchema, createSubmenuSchema, updateMenuSchema, updateSubmenuSchema } from "@/src/lib/data-schemas";
import { Menu } from "@/src/lib/type-definition";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import z from "zod";

type Props = {
    mode: "add" | "edit";
    defaultValues?: z.infer<typeof updateSubmenuSchema>;
    submenuId?: string;
};

export default function SubmenuForm({
    mode,
    defaultValues,
    submenuId,
}: Props) {
    const schema = mode === 'add' ? createSubmenuSchema : updateSubmenuSchema
    const [menus, setMenus] = useState<Menu[]>([])
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues:
            mode === "add"
                ? {
                      title: "",
                      url: "",
                      menu_id: "",
                      order_index: 0,
                  }
                : defaultValues,
    });

    useEffect(() => {
        const fetchMenus = async () => {
            const response = await fetch("/api/menus");
            const data = await response.json();
            console.log('menus :', data);
            setMenus(data);
        };
        fetchMenus();
    }, [])

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("url", values.url);
            formData.append("menu_id", values.menu_id);
            formData.append("order_index", values.order_index.toString());

            console.log('menu_id :', values.menu_id);

            const method = mode === "add" ? "POST" : "PUT";
            const url =
                mode === "add"
                    ? "/api/submenus"
                    : `/api/submenus/${submenuId}`;

            const response = await fetch(url, {
                method: method,
                body: formData,
            });

            console.log('response :', response);

            if (response.ok) {
                toast.success(
                    mode === "add"
                        ? "منو با موفقیت افزوده شد"
                        : "منو با موفقیت ویرایش شد"
                );
                form.reset()
            } else {
                throw new Error(
                    mode === "add"
                        ? "هنگام افزودن منو خطایی رخ داد"
                        : "هنگام ویرایش منو خطایی رخ داد"
                );
            }
        } catch (error) {
            toast.error(
                mode === "add"
                    ? "هنگام افزودن منو خطایی رخ داد"
                    : "هنگام ویرایش منو خطایی رخ داد"
            );
        }
    };

    return (
        <div dir="rtl">
            <Form {...form}>
                <form
                    className="space-y-10"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        عنوان ایتم
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
                            name="menu_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        والد لینک
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
                                                {menus?.map((menu) => (
                                                    <SelectItem
                                                        className="cursor-pointer hover:bg-gray-200 hover:text-title"
                                                        key={menu.id}
                                                        value={menu.id}
                                                    >
                                                        {menu.title}
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
                            {submenuId ? "ویرایش ایتم" : "افزودن ایتم"}
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
